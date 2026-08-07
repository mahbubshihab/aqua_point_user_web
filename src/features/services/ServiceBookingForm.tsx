'use client';

import React, { useState } from 'react';
import { 
  Wrench, 
  Calendar, 
  Clock, 
  MapPin, 
  PhoneCall, 
  User, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { submitServiceRequestToFirestore } from '@/core/services/firebase';

const MACHINE_TYPES = [
  'Aqua Point Supreme 7-Stage RO',
  'Aqua Point Mineral Guard RO',
  'Commercial / Industrial RO Plant',
  'Other Brand RO Purifier',
  'UV Water Sterilizer System',
  'Alkaline Water Filter Pitcher/Tap Filter'
];

const TIME_SLOTS = [
  'Morning (09:00 AM - 12:00 PM)',
  'Afternoon (12:00 PM - 03:00 PM)',
  'Late Afternoon (03:00 PM - 06:00 PM)',
  'Evening (06:00 PM - 08:30 PM)'
];

export const ServiceBookingForm: React.FC = () => {
  const [machineType, setMachineType] = useState(MACHINE_TYPES[0]);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredSlot, setPreferredSlot] = useState(TIME_SLOTS[0]);
  const [problemDescription, setProblemDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address || !preferredDate) {
      setErrorMsg('Please complete all required fields (*)');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      await submitServiceRequestToFirestore({
        machineType,
        customerName,
        phone,
        address,
        preferredDate,
        preferredSlot,
        problemDescription: problemDescription || 'Routine Servicing & Water Inspection'
      });

      setSuccess(true);
      setCustomerName('');
      setPhone('');
      setAddress('');
      setPreferredDate('');
      setProblemDescription('');
    } catch (err: any) {
      console.error("Failed to submit service request:", err);
      setErrorMsg('Failed to submit request. Please try calling our helpline 09613 700 750 directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#F0F9FF] via-white to-[#F8FAFC] border border-[#BAE6FD] shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#A7F3D0] text-xs font-bold text-[#10B981] shadow-sm">
          <Wrench className="w-3.5 h-3.5" /> 2-Hour Doorstep Service Dispatch
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          Book Technician <span className="text-[#00BCE1]">Maintenance & Repair</span>
        </h1>
        <p className="text-sm text-[#475569] max-w-2xl leading-relaxed">
          Schedule an expert Aqua Point certified technician for RO filter replacement, leakage repair, membrane backwash, or comprehensive water quality auditing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Form */}
        <div className="lg:col-span-8">
          <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#00BCE1]" />
              <span>Service Booking Request Form</span>
            </h2>

            {success && (
              <div className="p-6 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] space-y-2">
                <div className="flex items-center gap-2 text-[#10B981] font-bold text-lg">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>Service Request Submitted Successfully!</span>
                </div>
                <p className="text-xs text-[#334155]">
                  Your ticket has been registered successfully. An Aqua Point technician supervisor will call your phone to confirm appointment timing.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-2 text-xs font-bold text-[#00BCE1] hover:underline"
                >
                  Book another service request
                </button>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-600 font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Machine selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                  Select Machine / Equipment Type *
                </label>
                <select
                  value={machineType}
                  onChange={(e) => setMachineType(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-3 px-4 text-xs text-[#0F172A] focus:outline-none focus:border-[#00BCE1]"
                >
                  {MACHINE_TYPES.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#00BCE1]" /> Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Farhan Ahmed"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 px-3.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#00BCE1]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5 text-[#10B981]" /> Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 01812345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 px-3.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#00BCE1]"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" /> Service Address *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="House #, Road #, Area (e.g. Uttara, Mirpur, Banani), City"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 px-3.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#00BCE1]"
                />
              </div>

              {/* Appointment Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#00BCE1]" /> Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 px-3.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#00BCE1]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#475569] uppercase tracking-wider flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#10B981]" /> Preferred Time Slot *
                  </label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 px-3.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#00BCE1]"
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Problem Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#475569] uppercase tracking-wider">
                  Describe Problem / Service Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Water taste bad, low flow rate, filter change required, water leaking from pipe..."
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 px-3.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#00BCE1]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-[#00BCE1] hover:bg-[#00A3C7] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Wrench className="w-4 h-4" />
                <span>{loading ? 'Submitting Request...' : 'Confirm Doorstep Technician Booking'}</span>
              </button>

            </form>
          </div>
        </div>

        {/* Right Info Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-[#00BCE1] font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>Service Standard Guarantee</span>
            </div>
            <ul className="space-y-3 text-xs text-[#475569]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span>Certified trained technician with ID badge</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span>On-site water TDS & pH testing before and after service</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span>100% Genuine factory sealed replacement cartridges</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span>30-day service warranty against leakage</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-[#ECFDF5] border border-[#A7F3D0] text-center space-y-3 shadow-sm">
            <PhoneCall className="w-8 h-8 text-[#10B981] mx-auto animate-pulse" />
            <h3 className="text-base font-bold text-[#0F172A]">Need Emergency Service?</h3>
            <p className="text-xs text-[#334155]">
              For urgent pipe leaks or water contamination emergencies, call our hotline directly:
            </p>
            <a
              href="tel:09613700750"
              className="inline-block py-2.5 px-6 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-extrabold text-sm shadow-sm transition-all"
            >
              09613 700 750
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
