import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, Plus, Trash2, Edit2, X, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  student_name: string;
  role: string;
  text: string;
  rating: number;
  image_url: string;
}

export function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<Testimonial>>({
    student_name: '', role: '', text: '', rating: 5, image_url: ''
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/content/testimonials`);
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCurrentTestimonial(prev => ({
      ...prev,
      [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const method = currentTestimonial.id ? 'PUT' : 'POST';
      const url = currentTestimonial.id 
        ? `\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/content/testimonials/${currentTestimonial.id}`
        : `\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/content/testimonials`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(currentTestimonial)
      });

      if (!response.ok) throw new Error('Failed to save testimonial');
      
      setMessage('Testimonial saved successfully!');
      setTimeout(() => setMessage(''), 3000);
      setIsEditing(false);
      setCurrentTestimonial({ student_name: '', role: '', text: '', rating: 5, image_url: '' });
      fetchTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      setMessage('Error saving testimonial. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/content/testimonials/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to delete testimonial');
      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Failed to delete testimonial');
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setCurrentTestimonial(testimonial);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentTestimonial({ student_name: '', role: '', text: '', rating: 5, image_url: '' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full">
      {/* Edit / Create Form */}
      {isEditing && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-bold text-slate-800">
              {currentTestimonial.id ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h2>
            <button 
              onClick={cancelEdit}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {message && (
            <div className={`p-4 rounded-xl mb-6 ${message.includes('success') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Student Name</label>
                <input 
                  type="text" name="student_name" value={currentTestimonial.student_name} onChange={handleChange} required
                  className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Course / Role</label>
                <input 
                  type="text" name="role" value={currentTestimonial.role} onChange={handleChange} required
                  className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                  placeholder="e.g. Graphic Design Batch 2023"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Image URL (Optional)</label>
                <input 
                  type="text" name="image_url" value={currentTestimonial.image_url} onChange={handleChange}
                  className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Rating (1-5)</label>
                <select 
                  name="rating" value={currentTestimonial.rating} onChange={handleChange} required
                  className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                >
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Review Text</label>
              <textarea 
                name="text" value={currentTestimonial.text} onChange={handleChange} rows={4} required
                className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all resize-none"
              />
            </div>

            <div className="flex justify-end pt-4 gap-4">
              <button
                type="button" onClick={cancelEdit}
                className="px-6 py-3 rounded-xl font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit" disabled={saving}
                className="flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-dark transition-all disabled:opacity-50 shadow-md hover:shadow-lg"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save Testimonial
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Testimonials List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold text-slate-800">Manage Testimonials</h2>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-brand text-white font-bold rounded-xl transition-all hover:bg-brand-dark shadow-sm hover:shadow-md"
            >
              <Plus className="w-4 h-4" /> Add Testimonial
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {testimonial.image_url ? (
                    <img src={testimonial.image_url} alt={testimonial.student_name} className="w-12 h-12 rounded-full object-cover shadow-sm border border-slate-200" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 text-brand flex items-center justify-center font-bold text-lg">
                      {testimonial.student_name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-slate-800">{testimonial.student_name}</h3>
                    <p className="text-xs text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-200 text-slate-200'}`} />
                  ))}
                </div>
                <p className="text-sm text-slate-600 line-clamp-3 mb-4 italic">"{testimonial.text}"</p>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button 
                  onClick={() => handleEdit(testimonial)}
                  className="p-2 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(testimonial.id)}
                  className="p-2 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {testimonials.length === 0 && !loading && (
            <div className="col-span-full py-12 text-center text-slate-500">
              No testimonials found. Click "Add Testimonial" to create one.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
