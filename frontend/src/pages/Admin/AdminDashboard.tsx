import { useState, useEffect } from 'react';
import { Users, Phone, Mail, BookOpen, Calendar, ChevronDown, Download, Search, TrendingUp, Inbox } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  course: string;
  source: string;
  status: string;
  createdAt: string;
}

export function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/leads', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch leads');
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm) ||
    lead.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin shadow-[0_0_15px_rgba(147,51,234,0.5)]"></div>
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="show" 
      className="space-y-8"
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black font-heading text-slate-800">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time insights and student lead management.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand transition-colors" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand w-full sm:w-72 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 hover:text-brand hover:border-brand rounded-xl text-sm font-semibold transition-all hover:shadow-sm">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Leads', value: leads.length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'New Today', value: leads.filter(l => {
            if (!l.createdAt) return false;
            const today = new Date();
            const date = new Date(l.createdAt);
            return date.getDate() === today.getDate() && date.getMonth() === today.getMonth();
          }).length, icon: Calendar, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Pending Callback', value: leads.filter(l => l.status === 'New').length, icon: Phone, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Conversion Rate', value: '12%', icon: TrendingUp, color: 'text-brand', bg: 'bg-brand/10' },
        ].map((stat, i) => (
          <div key={i} className={`bg-white border border-slate-100 p-6 rounded-2xl flex items-center gap-5 group transition-all duration-300 hover:-translate-y-1 hover:shadow-md shadow-sm`}>
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-7 h-7 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Table Section */}
      <motion.div variants={itemVariants} className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Student Name</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Info</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Course Interest</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <Inbox className="w-8 h-8 opacity-50 text-slate-500" />
                      </div>
                      <p className="text-lg font-semibold text-slate-700">No leads found</p>
                      <p className="text-sm mt-1">Try adjusting your search criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-sm">
                          {lead.firstName.charAt(0)}{lead.lastName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{lead.firstName} {lead.lastName}</p>
                          <p className="text-xs text-slate-500">Source: <span className="text-brand">{lead.source}</span></p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5 text-sm">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Phone className="w-3.5 h-3.5" />
                          <span className="group-hover:text-slate-700 transition-colors">{lead.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                          <Mail className="w-3.5 h-3.5" />
                          <span className="group-hover:text-slate-700 transition-colors">{lead.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-brand" />
                        <span className="text-sm font-medium text-slate-700">{lead.course}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors">{formatDate(lead.createdAt)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-brand transition-colors p-2 hover:bg-slate-100 rounded-lg">
                        <ChevronDown className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
