'use client';

import React, { useState } from 'react';
import { Wrench, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitServiceRequestToFirestore } from '@/core/services/firebase';

export const ServiceBookingForm: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('');
  const [problemDescription, setProblemDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [submittedServiceId, setSubmittedServiceId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim() || !preferredDate || !preferredSlot) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await submitServiceRequestToFirestore({
        customerName: customerName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        machineType: '',
        preferredDate,
        preferredSlot,
        problemDescription: problemDescription.trim(),
      });

      setSubmittedServiceId(res.serviceId);
      setSuccess(true);
      setCustomerName('');
      setPhone('');
      setAddress('');
      setPreferredDate('');
      setPreferredSlot('');
      setProblemDescription('');
    } catch (err: any) {
      console.error('Failed to submit service request:', err);
      setErrorMsg('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#00BCE1]/10 border border-[#00BCE1]/20 flex items-center justify-center">
            <Wrench className="w-7 h-7 text-[#00BCE1]" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Book Service
          </h1>
          <p className="text-xs text-[#64748B]">
            Our technician will contact you shortly.
          </p>
        </div>

        {/* Form Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-lg shadow-slate-200/60">

          {/* Success State */}
          {success ? (
            <div className="text-center space-y-4 py-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#0F172A]">Request Submitted!</h3>
                {submittedServiceId && (
                  <div className="inline-block px-3 py-1 rounded-full bg-[#00BCE1]/10 text-[#00BCE1] font-mono font-bold text-xs border border-[#00BCE1]/20 my-1">
                    Service ID: #{submittedServiceId}
                  </div>
                )}
                <p className="text-xs text-[#64748B]">We will call you to confirm.</p>
              </div>
              <button
                onClick={() => setSuccess(false)}
                className="text-xs font-bold text-[#00BCE1] hover:underline"
              >
                Book another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Error */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-600 font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-3 px-4 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#00BCE1] focus:ring-2 focus:ring-[#00BCE1]/10 transition-all"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="01XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-3 px-4 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#00BCE1] focus:ring-2 focus:ring-[#00BCE1]/10 transition-all"
                />
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  Address
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Your service address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-3 px-4 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#00BCE1] focus:ring-2 focus:ring-[#00BCE1]/10 transition-all resize-none"
                />
              </div>

              {/* Preferred Date */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  min={today}
                  max={maxDate}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-3 px-4 text-sm text-[#0F172A] focus:outline-none focus:border-[#00BCE1] focus:ring-2 focus:ring-[#00BCE1]/10 transition-all"
                />
              </div>

              {/* Preferred Time */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  Preferred Time
                </label>
                <select
                  required
                  value={preferredSlot}
                  onChange={(e) => setPreferredSlot(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-3 px-4 text-sm text-[#0F172A] focus:outline-none focus:border-[#00BCE1] focus:ring-2 focus:ring-[#00BCE1]/10 transition-all"
                >
                  <option value="" disabled>Select a time slot</option>
                  <option value="Morning (9AM-12PM)">Morning (9AM-12PM)</option>
                  <option value="Afternoon (12PM-3PM)">Afternoon (12PM-3PM)</option>
                  <option value="Late Afternoon (3PM-6PM)">Late Afternoon (3PM-6PM)</option>
                  <option value="Evening (6PM-8:30PM)">Evening (6PM-8:30PM)</option>
                </select>
              </div>

              {/* Problem Description */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  Problem Description <span className="text-[#94A3B8] font-normal lowercase tracking-normal">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the issue you are facing..."
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-3 px-4 text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#00BCE1] focus:ring-2 focus:ring-[#00BCE1]/10 transition-all resize-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#00BCE1] hover:bg-[#00A3C7] text-white font-bold text-sm shadow-md shadow-[#00BCE1]/20 hover:shadow-lg hover:shadow-[#00BCE1]/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Book Service</span>
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};

