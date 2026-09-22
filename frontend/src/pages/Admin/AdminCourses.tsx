import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, Plus, Trash2, Edit2, X } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  level: string;
  price: string;
  icon: string;
  image_url: string;
  category: string;
}

export function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Partial<Course>>({
    title: '', description: '', duration: '', level: '', price: '', icon: '', image_url: '', category: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/content/courses');
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentCourse(prev => ({
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
      const method = currentCourse.id ? 'PUT' : 'POST';
      const url = currentCourse.id 
        ? `http://localhost:5000/api/content/courses/${currentCourse.id}`
        : 'http://localhost:5000/api/content/courses';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(currentCourse)
      });

      if (!response.ok) throw new Error('Failed to save course');
      
      setMessage('Course saved successfully!');
      setTimeout(() => setMessage(''), 3000);
      setIsEditing(false);
      setCurrentCourse({ title: '', description: '', duration: '', level: '', price: '', icon: '', image_url: '', category: '' });
      fetchCourses();
    } catch (error) {
      console.error('Error saving course:', error);
      setMessage('Error saving course. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/content/courses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Failed to delete course');
      fetchCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course');
    }
  };

  const handleEdit = (course: Course) => {
    setCurrentCourse({
      ...course,
      title: course.title || '',
      description: course.description || '',
      duration: course.duration || '',
      level: course.level || '',
      price: course.price || '',
      icon: course.icon || '',
      image_url: course.image_url || '',
      category: course.category || '',
    });
    setIsEditing(true);
    window.scrollTo(0, 0);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentCourse({ title: '', description: '', duration: '', level: '', price: '', icon: '', image_url: '', category: '' });
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
              {currentCourse.id ? 'Edit Course' : 'Add New Course'}
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
                <label className="block text-sm font-medium text-slate-600 mb-2">Title</label>
                <input 
                  type="text" name="title" value={currentCourse.title} onChange={handleChange} required
                  className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Icon (Lucide Icon Name)</label>
                <input 
                  type="text" name="icon" value={currentCourse.icon} onChange={handleChange}
                  className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                  placeholder="e.g., Code, Palette, Camera"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Image URL</label>
                <input 
                  type="text" name="image_url" value={currentCourse.image_url} onChange={handleChange}
                  className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                  placeholder="e.g., https://images.unsplash.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Category</label>
                <input 
                  type="text" name="category" value={currentCourse.category} onChange={handleChange} required
                  className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                  placeholder="e.g., DEVELOPMENT, DATA & AI"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Duration</label>
                <input 
                  type="text" name="duration" value={currentCourse.duration} onChange={handleChange} required
                  className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Level</label>
                <input 
                  type="text" name="level" value={currentCourse.level} onChange={handleChange} required
                  className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Price</label>
                <input 
                  type="text" name="price" value={currentCourse.price} onChange={handleChange} required
                  className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-700 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Description</label>
              <textarea 
                name="description" value={currentCourse.description} onChange={handleChange} rows={4} required
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
                Save Course
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Courses List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold text-slate-800">Manage Courses</h2>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-brand text-white font-bold rounded-xl transition-all hover:bg-brand-dark shadow-sm hover:shadow-md"
            >
              <Plus className="w-4 h-4" /> Add Course
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map(course => (
            <div key={course.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-slate-800">{course.title}</h3>
                  <span className="font-bold text-brand">{course.price}</span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2 mb-4">{course.description}</p>
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-4">
                  <span>{course.duration}</span>
                  <span>•</span>
                  <span>{course.level}</span>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button 
                  onClick={() => handleEdit(course)}
                  className="p-2 text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(course.id)}
                  className="p-2 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          {courses.length === 0 && !loading && (
            <div className="col-span-full py-12 text-center text-slate-500">
              No courses found. Click "Add Course" to create one.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
