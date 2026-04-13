'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

const roles = [
  'Business leader',
  'Technical founder',
  'Product manager',
  'Researcher',
  'Investor',
  'Other',
];

const bulletItems = [
  '30 minute discovery session',
  'Tailored solutions discussion',
  'No pressure environment',
  'Actionable insights',
];

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const { ref: leftRef, inView: leftInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: rightRef, inView: rightInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const inputClasses =
    'w-full bg-[#f8f8f8] border border-transparent rounded-xl py-3 px-4 text-[#001a2b] placeholder:text-gray-400 focus:outline-none focus:border-[#e57368] focus:bg-white focus:ring-2 focus:ring-[#e57368]/20 transition-all duration-200 text-sm';

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">

            {/* Left column — consultation card */}
            <div
              ref={leftRef}
              className={`bg-[#001a2b] p-8 lg:p-10 rounded-3xl fade-left${leftInView ? ' in-view' : ''}`}
            >
              <div className="gradient-eyebrow midnight-blue mb-4 inline-block">
                <span className="text-style-tagline midnight-blue">
                  Free &middot; No Commitment
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 leading-snug">
                Schedule a free consultation
              </h3>
              <p className="text-white/60 text-sm mb-8">
                Pick a time that works for you — no obligations, just a real conversation.
              </p>

              <ul className="space-y-4 mb-10">
                {bulletItems.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Image
                      src="/images/Group-15430.svg"
                      alt=""
                      width={22}
                      height={22}
                      className="rounded-none shrink-0"
                    />
                    <span className="text-white/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://outlook.office.com/book/TenSparrowsBooking@tensparrows.com/?ismsaljsauthenabled=true"
                target="_blank"
                rel="noopener noreferrer"
                className="button-solid block text-center w-full"
              >
                Schedule Your Session
              </a>

              {/* Divider */}
              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-white/40 text-xs uppercase tracking-widest">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <p className="text-white/50 text-sm text-center">
                Prefer email?{' '}
                <a href="mailto:info@tensparrows.com" className="text-[#f3b44a] hover:underline">
                  info@tensparrows.com
                </a>
              </p>
            </div>

            {/* Right column — contact form */}
            <div
              ref={rightRef}
              className={`bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-[0_4px_32px_rgba(0,0,0,0.07)] fade-right${rightInView ? ' in-view' : ''}`}
            >
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-5">
                    <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[#001a2b] mb-2">Message sent</h3>
                  <p className="text-[#050707]/60 text-sm">
                    Thanks for reaching out. We&apos;ll be in touch soon.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-[#001a2b] mb-1">Send us a message</h3>
                  <p className="text-sm text-[#050707]/50 mb-6">We typically respond within one business day.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First + Last name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-xs font-semibold text-[#001a2b]/60 uppercase tracking-wide mb-1.5">
                          First name
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className={inputClasses}
                          placeholder="Jane"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-xs font-semibold text-[#001a2b]/60 uppercase tracking-wide mb-1.5">
                          Last name
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className={inputClasses}
                          placeholder="Smith"
                        />
                      </div>
                    </div>

                    {/* Email + Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-[#001a2b]/60 uppercase tracking-wide mb-1.5">
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className={inputClasses}
                          placeholder="jane@company.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-xs font-semibold text-[#001a2b]/60 uppercase tracking-wide mb-1.5">
                          Phone <span className="normal-case font-normal">(optional)</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className={inputClasses}
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    {/* Role selector */}
                    <div>
                      <p className="block text-xs font-semibold text-[#001a2b]/60 uppercase tracking-wide mb-3">
                        How would you describe yourself?
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {roles.map((role) => (
                          <label
                            key={role}
                            className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border text-sm transition-all duration-150 ${
                              formData.role === role
                                ? 'border-[#e57368] bg-[#e57368]/5 text-[#e57368] font-medium'
                                : 'border-gray-200 text-[#001a2b]/70 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="role"
                              value={role}
                              checked={formData.role === role}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <span className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                              formData.role === role ? 'border-[#e57368] bg-[#e57368]' : 'border-gray-300'
                            }`}>
                              {formData.role === role && (
                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                              )}
                            </span>
                            {role}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-[#001a2b]/60 uppercase tracking-wide mb-1.5">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className={inputClasses + ' resize-none'}
                        placeholder="Tell us a bit about your situation or what you're looking for..."
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-red-500 text-sm bg-red-50 px-4 py-2.5 rounded-lg">
                        Something didn&apos;t work. Please try again.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="button-gradient w-full disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? 'Sending…' : 'Send Message'}
                    </button>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
