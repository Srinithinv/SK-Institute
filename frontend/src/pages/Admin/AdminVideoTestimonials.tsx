import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, Plus, Trash2, Edit2, X, Play } from 'lucide-react';

interface VideoTestimonial {
  id: number;
  student_name: string;
  video_url: string;
  thumbnail_url: string;
}

export function AdminVideoTestimonials() {
  const [videoTestimonials, setVideoTestimonials] = useState<VideoTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentVideoTestimonial, setCurrentVideoTestimonial] = useState<Partial<VideoTestimonial>>({
    student_name: '', video_url: '', thumbnail_url: ''
  });

  useEffect(() => {
    fetchVideoTestimonials();
  }, []);

  const fetchVideoTestimonials = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/content/video-testimonials');
      if (!response.ok) throw new Error('Failed to fetch video testimonials');
      const data = await response.json();
      setVideoTestimonials(data);
    } catch (error) {
      console.error('Error fetching video testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentVideoTestimonial(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const method = currentVideoTestimonial.id ? 'PUT' : 'POST';
      const url = currentVideoTestimonial.id 
        ? `http://localhost:5000/api/content/video-testimonials/${currentVideoTestimonial.id}`
        : 'http://localhost:5000/api/content/video-testimonials';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(currentVideoTestimonial)
      });

      if (!response.ok) throw new Error('Failed to save video testimonial');
      
      setMessage('Video Testimonial saved successfully!');
      setTimeout(() => setMessage(''), 3000);
      setIsEditing(false);
      setCurrentVideoTestimonial({ student_name: '', video_url: '', thumbnail_url: '' });
      fetchVideoTestimonials();
    } catch (error) {
      console.error('Error saving video testimonial:', error);
      setMessage('Error saving video testimonial. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this video testimonial?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/content/video-testimonials/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to delete video testimonial');
      fetchVideoTestimonials();
    } catch (error) {
      console.error('Error deleting video testimonial:', error);
      alert('Failed to delete video testimonial');
    }
  };

  const handleEdit = (videoTestimonial: VideoTestimonial) => {
    setCurrentVideoTestimonial(videoTestimonial);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentVideoTestimonial({ student_name: '', video_url: '', thumbnail_url: '' });
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
              {currentVideoTestimonial.id ? 'Edit Video Testimonial' : 'Add New Video Testimonial'}
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
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Student Name</label>
              <input 
                type="text" name="student_name" value={currentVideoTestimonial.student_name} onChange={handleChange} required
                className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Video URL (YouTube/Vimeo Embed URL)</label>
              <input 
                type="url" name="video_url" value={currentVideoTestimonial.video_url} onChange={handleChange} required
                className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Thumbnail URL</label>
              <input 
                type="url" name="thumbnail_url" value={currentVideoTestimonial.thumbnail_url} onChange={handleChange} required
                className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
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

      {/* Video Testimonials List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold text-slate-800">Manage Video Testimonials</h2>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-brand text-white font-bold rounded-xl transition-all hover:bg-brand-dark shadow-sm hover:shadow-md"
            >
              <Plus className="w-4 h-4" /> Add Video Testimonial
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoTestimonials.map(testimonial => (
            <div key={testimonial.id} className="rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              <div className="relative aspect-video">
                <img src={testimonial.thumbnail_url} alt={testimonial.student_name} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white">
                    <Play className="w-4 h-4 fill-current ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-800 line-clamp-1">{testimonial.student_name}</h3>
                  <p className="text-xs text-slate-500 mt-1">Video Testimonial</p>
                </div>
                <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-slate-200">
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
            </div>
          ))}
          {videoTestimonials.length === 0 && !loading && (
            <div className="col-span-full py-12 text-center text-slate-500">
              No video testimonials found. Click "Add Video Testimonial" to create one.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
