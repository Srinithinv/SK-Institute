import { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function AdminAbout() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mission: '',
    vision: '',
    stats_students: '',
    stats_courses: '',
    stats_awards: ''
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/content/about');
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setFormData(data);
        }
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/content/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage('About section updated successfully!');
      } else {
        setMessage('Failed to update.');
      }
    } catch (error) {
      setMessage('An error occurred.');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin text-brand" /></div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 w-full"
    >
      <h2 className="text-2xl font-heading font-bold text-slate-800 mb-6">Manage About Section</h2>
      
      {message && (
        <div className={`p-4 rounded-xl mb-6 ${message.includes('success') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Title</label>
          <input 
            type="text" 
            name="title"
            value={formData.title} 
            onChange={handleChange}
            className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Description</label>
          <textarea 
            name="description"
            value={formData.description} 
            onChange={handleChange}
            rows={4}
            className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all resize-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Mission</label>
            <textarea 
              name="mission"
              value={formData.mission} 
              onChange={handleChange}
              rows={3}
              className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all resize-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Vision</label>
            <textarea 
              name="vision"
              value={formData.vision} 
              onChange={handleChange}
              rows={3}
              className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all resize-none"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Stats: Students</label>
            <input 
              type="text" 
              name="stats_students"
              value={formData.stats_students} 
              onChange={handleChange}
              className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Stats: Courses</label>
            <input 
              type="text" 
              name="stats_courses"
              value={formData.stats_courses} 
              onChange={handleChange}
              className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2">Stats: Awards</label>
            <input 
              type="text" 
              name="stats_awards"
              value={formData.stats_awards} 
              onChange={handleChange}
              className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-dark transition-all disabled:opacity-50 shadow-md hover:shadow-lg"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save Changes
          </button>
        </div>
      </form>
    </motion.div>
  );
}
