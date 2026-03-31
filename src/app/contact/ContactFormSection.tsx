'use client';

import { useState } from 'react';
import Image from 'next/image';

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const inputClasses =
    'w-full bg-white border border-gray-300 rounded-md py-3 px-4 text-[#001a2b] placeholder:text-gray-400 focus:outline-none focus:border-[#e57368] focus:ring-1 focus:ring-[#e57368] transition-colors';

  return (
    <section className="off-white-background py-16 lg:py-24">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left column - midnight consultation box */}
            <div className="bg-[#001a2b] p-10 rounded-3xl">
              <div className="gradient-eyebrow mb-4">
                <span className="text-style-tagline midnight-blue">
                  Free &middot; No Commitment
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-8">
                Schedule a free consultation
              </h3>

              <ul className="space-y-4 mb-10">
                {bulletItems.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Image
                      src="/images/Group-15430.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="rounded-none flex-shrink-0"
                    />
                    <span className="text-white/80 text-base">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://outlook.office.com/book/TenSparrowsBooking@tensparrows.com/?ismsaljsauthenabled=true"
                target="_blank"
                rel="noopener noreferrer"
                className="button-gradient w-full"
              >
                Schedule Your Session
              </a>
            </div>

            {/* Right column - Contact form */}
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <svg
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-lg text-[#001a2b] font-medium">
                    Thanks for reaching out. We&apos;ll be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* First name + Last name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-[#001a2b] mb-1.5"
                      >
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
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-[#001a2b] mb-1.5"
                      >
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
                      />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#001a2b] mb-1.5"
                      >
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
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-[#001a2b] mb-1.5"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {/* Radio buttons */}
                  <div>
                    <p className="block text-sm font-medium text-[#001a2b] mb-3">
                      How would you describe yourself?
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {roles.map((role) => (
                        <label
                          key={role}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <span
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                              formData.role === role
                                ? 'border-[#e57368] bg-[#e57368]'
                                : 'border-gray-300 group-hover:border-gray-400'
                            }`}
                          >
                            {formData.role === role && (
                              <span className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </span>
                          <input
                            type="radio"
                            name="role"
                            value={role}
                            checked={formData.role === role}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <span className="text-sm text-[#001a2b]">{role}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[#001a2b] mb-1.5"
                    >
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
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-600 text-sm">
                      Something didn&apos;t work. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="button-gradient w-full disabled:opacity-60"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
