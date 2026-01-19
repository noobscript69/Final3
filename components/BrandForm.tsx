
import React from 'react';
import { UserInput } from '../types';

interface BrandFormProps {
  onSubmit: (data: UserInput) => void;
  isLoading: boolean;
}

const BrandForm: React.FC<BrandFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState<UserInput>({
    name: '',
    industry: '',
    experience: '',
    goals: '',
    tone: 'Professional & Authoritative'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Full Name</label>
          <input
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Industry / Niche</label>
          <input
            required
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            placeholder="FinTech, Web Design, SaaS..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Experience & Key Skills</label>
        <textarea
          required
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          rows={3}
          placeholder="Briefly describe your background and core strengths..."
          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">What are your primary brand goals?</label>
        <input
          required
          name="goals"
          value={formData.goals}
          onChange={handleChange}
          placeholder="Build authority, attract high-ticket clients, grow LinkedIn..."
          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-300">Brand Tone</label>
        <select
          name="tone"
          value={formData.tone}
          onChange={handleChange}
          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        >
          <option>Professional & Authoritative</option>
          <option>Creative & Playful</option>
          <option>Minimalist & Modern</option>
          <option>Witty & Provocative</option>
          <option>Compassionate & Empowering</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-gradient-to-r from-indigo-600 to-rose-500 hover:from-indigo-500 hover:to-rose-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Strategy...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Build My Brand Identity
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        )}
      </button>
    </form>
  );
};

export default BrandForm;
