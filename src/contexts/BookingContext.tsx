import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface BookingContextType {
  isBookingOpen: boolean;
  openBooking: () => void;
  closeBooking: () => void;
  submitBooking: (data: any) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => {
    setIsBookingOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    document.body.style.overflow = 'unset';
  };

  const submitBooking = async (data: any) => {
    try {
      await addDoc(collection(db, 'leads'), {
        ...data,
        createdAt: serverTimestamp(),
        source: 'BookingPopup',
        status: 'New'
      });
    } catch (error) {
      console.error("Error adding booking: ", error);
      throw error;
    }
  };

  return (
    <BookingContext.Provider value={{ isBookingOpen, openBooking, closeBooking, submitBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
