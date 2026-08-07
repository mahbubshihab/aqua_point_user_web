'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  PhoneCall, 
  Mail, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Building2,
  Droplets,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { submitInquiryToFirestore } from '@/core/services/firebase';

export const AboutContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      setErrorMsg('Please enter your name, phone, and message.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      await submitInquiryToFirestore({
        name,
        phone,
        email,
        subject: subject || 'General Inquiry',
        message
      });

      setSuccess(true);
      setName('');
      setPhone('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Submission failed. Please contact us via phone or WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* About Header */}
      <div id="about" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#131826] via-[#1E2638] to-[#0A0D16] border border-[#1E2638] backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0D16] border border-[#00E5FF]/30 text-xs font-bold text-[#00E5FF]">
          <Droplets className="w-3.5 h-3.5" /> Pure Water Engineering Since 2018
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              About <span className="text-[#00E5FF]">Aqua Point</span> Water Solutions
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Aqua Point is Bangladesh’s pioneer in luxury Woodistic glass reverse osmosis purifiers, domestic drinking water plants, and industrial water treatment installations. Our mission is to guarantee pure, mineral-balanced, toxin-free water for every household and business.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 text-xs">
              <div className="p-3 rounded-xl bg-[#0A0D16] border border-[#1E2638] space-y-1">
                <span className="text-[#10B981] font-extrabold text-base">50,000+</span>
                <span className="block text-slate-400">Happy Homes Purified</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0A0D16] border border-[#1E2638] space-y-1">
                <span className="text-[#00E5FF] font-extrabold text-base">500+</span>
                <span className="block text-slate-400">Industrial RO Projects</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0A0D16] border border-[#1E2638] space-y-1">
                <span className="text-[#F59E0B] font-extrabold text-base">24/7</span>
                <span className="block text-slate-400">Technician Helpline</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="p-6 rounded-2xl bg-[#0A0D16] border border-[#1E2638] space-y-4 text-center">
              <ShieldCheck className="w-12 h-12 text-[#10B981] mx-auto" />
              <h3 className="text-base font-bold text-white">BSTI & NSF Certified</h3>
              <p className="text-xs text-slate-400">
                All Aqua Point membranes and carbon blocks adhere to global WHO drinking water quality thresholds.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Cards */}
      <div id="contact" className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#10B981] uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            Contact & Headquarters Location
          </h2>
          <p className="text-sm text-slate-400">
            Reach out to our customer support team or visit our corporate gallery in Banani, Dhaka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Helpline */}
          <div className="p-6 rounded-2xl bg-[#131826]/80 border border-[#1E2638] backdrop-blur-xl space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-white">24/7 Phone Helpline</h3>
            <p className="text-xs text-slate-400">Direct hotline for sales inquiries and emergency repair bookings.</p>
            <div className="space-y-1">
              <a href="tel:09613700750" className="text-lg font-extrabold text-[#00E5FF] hover:underline block">
                09613 700 750
              </a>
              <span className="text-[11px] text-slate-500 block">Tolled as local operator rate</span>
            </div>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="p-6 rounded-2xl bg-[#131826]/80 border border-[#1E2638] backdrop-blur-xl space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">WhatsApp Live Chat</h3>
            <p className="text-xs text-slate-400">Send photo of your water purifier or address location for instant advice.</p>
            <a
              href="https://wa.me/8809613700750"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-[#0A0D16] font-extrabold text-xs hover:scale-105 transition-transform"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Card 3: Address */}
          <div className="p-6 rounded-2xl bg-[#131826]/80 border border-[#1E2638] backdrop-blur-xl space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#00E5FF]/15 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Banani Corporate Tower</h3>
            <p className="text-xs text-slate-400">House 42, Road 11, Block D, Banani, Dhaka-1213, Bangladesh</p>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
              <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Sat - Thu: 09:00 AM - 08:00 PM</span>
            </div>
          </div>

        </div>
      </div>

      {/* Form & Map Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Interactive Form saving to Firestore `inquiries` */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-[#131826]/80 border border-[#1E2638] backdrop-blur-xl shadow-2xl space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white">Send Us An Inquiry Message</h3>
            <p className="text-xs text-slate-400 mt-1">Have a custom corporate project or service question? Write to us below.</p>
          </div>

          {success && (
            <div className="p-4 rounded-xl bg-[#10B981]/20 border border-[#10B981] text-xs text-[#10B981] font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Thank you! Your inquiry message was saved. We will contact you back shortly.</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-500/20 border border-rose-500 text-xs text-rose-300">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleInquirySubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0A0D16] border border-[#1E2638] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="017xxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0A0D16] border border-[#1E2638] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0A0D16] border border-[#1E2638] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Industrial RO Quote"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#0A0D16] border border-[#1E2638] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Your Message *</label>
              <textarea
                required
                rows={4}
                placeholder="Write details about your requirement..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#0A0D16] border border-[#1E2638] rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#10B981] text-[#0A0D16] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Sending Message...' : 'Submit Inquiry to Firestore'}</span>
            </button>
          </form>
        </div>

        {/* Map / Location Box */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-[#131826]/80 border border-[#1E2638] backdrop-blur-xl shadow-2xl space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#00E5FF]" />
            <span>Map & Service Reach</span>
          </h3>

          <div className="w-full h-72 rounded-2xl bg-[#0A0D16] border border-[#1E2638] overflow-hidden relative flex items-center justify-center text-center p-4">
            <div className="space-y-3">
              <MapPin className="w-10 h-10 text-[#00E5FF] mx-auto animate-bounce" />
              <div className="text-sm font-bold text-white">Banani Block D, Dhaka</div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Aqua Point operates 12 regional service hubs covering Dhaka North, Dhaka South, Gazipur, Narayanganj & Chittagong.
              </p>
              <a
                href="https://maps.google.com/?q=Banani+Dhaka"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#10B981] hover:underline"
              >
                <Globe className="w-3.5 h-3.5" /> Open Google Maps
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
