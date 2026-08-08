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
  Globe
} from 'lucide-react';
import { submitInquiryToFirestore, fetchCompanyInfoFromFirestore, CompanyInfo } from '@/core/services/firebase';

export const AboutContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  React.useEffect(() => {
    fetchCompanyInfoFromFirestore().then(info => {
      if (info) setCompanyInfo(info);
    }).catch(() => {});
  }, []);

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
      <div id="about" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#F0F9FF] via-white to-[#F8FAFC] border border-[#BAE6FD] shadow-sm space-y-6">
        {companyInfo?.founder && companyInfo?.foundedYear && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#BAE6FD] text-xs font-bold text-[#00BCE1] shadow-sm">
            <Droplets className="w-3.5 h-3.5" /> Founded {companyInfo.foundedYear} by {companyInfo.founder}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              About <span className="text-[#00BCE1]">{companyInfo?.name || 'Us'}</span>
            </h1>
            {companyInfo?.description && (
              <p className="text-sm text-[#475569] leading-relaxed">
                {companyInfo.description}
              </p>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] space-y-1 shadow-sm">
                <span className="text-[#10B981] font-extrabold text-lg">50,000+</span>
                <span className="block text-[#64748B]">Happy Homes Purified</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] space-y-1 shadow-sm">
                <span className="text-[#00BCE1] font-extrabold text-lg">500+</span>
                <span className="block text-[#64748B]">Industrial RO Projects</span>
              </div>
              {companyInfo?.foundedYear && (
                <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] space-y-1 shadow-sm">
                  <span className="text-[#F59E0B] font-extrabold text-lg">Since {companyInfo.foundedYear}</span>
                  <span className="block text-[#64748B]">{new Date().getFullYear() - Number(companyInfo.foundedYear)}+ Years Purity Trust</span>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] space-y-4 text-center shadow-sm">
              <ShieldCheck className="w-12 h-12 text-[#10B981] mx-auto" />
              <h3 className="text-base font-bold text-[#0F172A]">BSTI & WHO Certified</h3>
              <p className="text-xs text-[#475569]">
                All Aqua Point membranes and carbon blocks adhere to global WHO drinking water quality standards.
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
          <h2 className="text-3xl font-extrabold text-[#0F172A]">
            Contact & Corporate Office
          </h2>
          <p className="text-sm text-[#475569]">
            Reach out to our customer support team or visit our corporate office at Janata Housing Road, Ring Road, Dhaka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Helpline */}
          {companyInfo?.helpline && (
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center text-[#00BCE1]">
                <PhoneCall className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">Direct Helpline</h3>
              <p className="text-xs text-[#475569]">Hotline for sales inquiries, emergency repairs & servicing bookings.</p>
              <div className="space-y-1">
                <a href={`tel:${companyInfo.helpline.split('/')[0].trim()}`} className="text-base font-extrabold text-[#00BCE1] hover:underline block">
                  {companyInfo.helpline}
                </a>
                {companyInfo.email && (
                  <span className="text-[11px] text-[#64748B] block">Email: {companyInfo.email}</span>
                )}
              </div>
            </div>
          )}

          {/* Card 2: WhatsApp */}
          {companyInfo?.whatsapp && (
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#10B981]">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">WhatsApp Live Chat</h3>
              <p className="text-xs text-[#475569]">Send photo of your water purifier or address location for instant advice.</p>
              <a
                href={companyInfo.whatsapp.includes('http') ? companyInfo.whatsapp : `https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#10B981] text-white font-bold text-xs hover:scale-105 transition-transform shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          )}

          {/* Card 3: Address */}
          {companyInfo?.address && (
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center text-[#00BCE1]">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">Corporate Office</h3>
              <p className="text-xs text-[#475569]">{companyInfo.address}</p>
              <div className="text-[11px] text-[#64748B] flex items-center gap-1.5 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Sat - Thu: 09:00 AM - 08:00 PM</span>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Form & Map Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Interactive Form */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-bold text-[#0F172A]">Send Us An Inquiry Message</h3>
            <p className="text-xs text-[#475569] mt-1">Have a custom corporate project or service question? Write to us below.</p>
          </div>

          {success && (
            <div className="p-4 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-xs text-[#10B981] font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Thank you! Your inquiry message was saved. We will contact you back shortly.</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-600 font-semibold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleInquirySubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#475569]">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 px-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#00BCE1]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#475569]">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="017xxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 px-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#00BCE1]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#475569]">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 px-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#00BCE1]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#475569]">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Industrial RO Quote"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 px-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#00BCE1]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#475569]">Your Message *</label>
              <textarea
                required
                rows={4}
                placeholder="Write details about your requirement..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 px-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#00BCE1]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#00BCE1] hover:bg-[#00A3C7] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Sending Message...' : 'Submit Inquiry'}</span>
            </button>
          </form>
        </div>

        {/* Map / Location Box */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#00BCE1]" />
            <span>Map & Service Reach</span>
          </h3>

          <div className="w-full h-72 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] overflow-hidden relative flex items-center justify-center text-center p-4">
            <div className="space-y-3">
              <MapPin className="w-10 h-10 text-[#00BCE1] mx-auto animate-bounce" />
              {companyInfo?.address && (
                <div className="text-sm font-bold text-[#0F172A]">{companyInfo.address}</div>
              )}
              <p className="text-xs text-[#475569] max-w-xs mx-auto">
                Aqua Point operates regional service hubs covering Dhaka North, Dhaka South, Gazipur, Narayanganj & Chittagong.
              </p>
              <a
                href="https://maps.google.com/?q=Ring+Road+Dhaka"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00BCE1] hover:underline"
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
