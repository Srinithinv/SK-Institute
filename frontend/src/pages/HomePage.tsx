import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/sections/Hero';
import { HiringPartners } from '../components/sections/HiringPartners';
import { AboutInstitute } from '../components/sections/AboutInstitute';
import { AboutFounder } from '../components/sections/AboutFounder';
import { WhyChooseUs } from '../components/sections/WhyChooseUs';
import { CourseDiscovery } from '../components/sections/CourseDiscovery';
import { Mentors } from '../components/sections/Mentors';
import { VideoGallery } from '../components/sections/VideoGallery';
import { Testimonials } from '../components/sections/Testimonials';
import { VideoReviews } from '../components/sections/VideoReviews';
import { UpcomingBatches } from '../components/sections/UpcomingBatches';
import { FAQ } from '../components/sections/FAQ';
import { Contact } from '../components/sections/Contact';
import { OffersPopup } from '../components/ui/OffersPopup';

export function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      // Delay to ensure DOM is fully painted when navigating from another page
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    }
  }, [hash]);

  return (
    <main>
      <OffersPopup />
      <Hero />
      <HiringPartners />
      <AboutInstitute />
      <AboutFounder />
      <WhyChooseUs />
      <CourseDiscovery />
      <Mentors />
      <VideoGallery />
      <Testimonials />
      <VideoReviews />
      <UpcomingBatches />
      <FAQ />
      <Contact />
    </main>
  );
}
