'use client';

import React, { useState } from 'react';
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

  /* Matches Webflow form_input:
     border-radius 12px, bg #0507070d (neutral-darkest-5),
     min-height 2.75rem, padding .5rem .75rem, font-size 1rem */
  const inputClasses =
    'w-full rounded-xl border border-transparent min-h-[2.75rem] py-2 px-3 text-[#050707] text-base leading-relaxed focus:outline-none focus:border-[#050707] transition-all duration-200';

  return (
    /* padding-global (5%) + padding-section-large (7rem top/bottom) */
    <section className="off-white-background px-[5%] py-[7rem]">
      {/* container-large: max-width 80rem centered */}
      <div className="w-full max-w-[80rem] mx-auto">
        {/* contact6_content: grid-template-columns max-content auto, gap 3rem */}
        <div
          className="items-start"
          style={{
            display: 'grid',
            gridTemplateColumns: 'max-content auto',
            columnGap: '3rem',
            rowGap: '4rem',
          }}
        >

          {/* Left — midnight-bg card: max-width 400px, padding 30px, border-radius 20px */}
          <div
            ref={leftRef}
            className={`fade-left${leftInView ? ' in-view' : ''}`}
            style={{
              backgroundColor: '#001a2b',
              backgroundImage: "linear-gradient(rgba(0,26,43,0.8), rgba(0,26,43,0.8)), url('/images/imgi_50_image.jpeg')",
              backgroundPosition: '0 0, 50%',
              backgroundSize: 'auto, contain',
              borderRadius: '20px',
              width: 'auto',
              maxWidth: '400px',
              padding: '30px',
            }}
          >
            {/* Eyebrow — margin-bottom 1rem */}
            <div className="mb-4">
              <div className="gradient-eyebrow inline-block">
                <span className="text-style-tagline midnight-blue">Free &middot; No Commitment</span>
              </div>
            </div>

            {/* heading-style-h3 in Webflow: 2.75rem, font-weight 400, letter-spacing -2px */}
            <h2
              className="text-white mb-0"
              style={{ fontSize: '2.125rem', fontWeight: 400, letterSpacing: '-1px', lineHeight: 1.3 }}
            >
              Schedule a free consultation
            </h2>

            {/* bullet-list: grid 2-col (icon + text), gap 8px, margin 20px top/bottom */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                columnGap: '8px',
                rowGap: '8px',
                alignItems: 'center',
                marginTop: '20px',
                marginBottom: '20px',
              }}
            >
              {bulletItems.map((item) => (
                <React.Fragment key={item}>
                  <Image
                    src="/images/Group-15430.svg"
                    alt=""
                    width={22}
                    height={22}
                    className="rounded-none shrink-0"
                  />
                  <p className="text-white/80 text-[1.125rem] m-0 leading-snug">{item}</p>
                </React.Fragment>
              ))}
            </div>

            {/* primary-button fill — gradient pill, full width, flex centered */}
            <a
              href="https://outlook.office.com/book/TenSparrowsBooking@tensparrows.com/?ismsaljsauthenabled=true"
              target="_blank"
              rel="noopener noreferrer"
              className="button-solid flex items-center justify-center w-full text-center"
            >
              Schedule Your Session
            </a>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/40 text-xs uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <p className="text-white/50 text-sm text-center m-0">
              Prefer email?{' '}
              <a href="mailto:info@tensparrows.com" className="text-[#f3b44a] hover:underline">
                info@tensparrows.com
              </a>
            </p>
          </div>

          {/* Right — contact6_form: white bg, border-radius 10px, padding 30px, box-shadow */}
          <div
            ref={rightRef}
            className={`fade-right${rightInView ? ' in-view' : ''}`}
          >
            {status === 'success' ? (
              <div
                className="bg-white flex flex-col items-center justify-center py-16 text-center"
                style={{ borderRadius: '10px', padding: '30px', boxShadow: '0 2px 14px #a7a7a733' }}
              >
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
              <form
                onSubmit={handleSubmit}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                  padding: '30px',
                  boxShadow: '0 2px 14px #a7a7a733',
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  rowGap: '1.5rem',
                  columnGap: '1.5rem',
                }}
              >
                {/* form_field-2col: 2-col grid, gap 1.5rem */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '1.5rem', rowGap: '1.5rem' }}>
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-normal text-[#050707] mb-2">
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
                      style={{ backgroundColor: '#0507070d' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-normal text-[#050707] mb-2">
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
                      style={{ backgroundColor: '#0507070d' }}
                    />
                  </div>
                </div>

                {/* form_field-2col is-mobile-1col */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '1.5rem', rowGap: '1.5rem' }}>
                  <div>
                    <label htmlFor="email" className="block text-sm font-normal text-[#050707] mb-2">
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
                      style={{ backgroundColor: '#0507070d' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-normal text-[#050707] mb-2">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClasses}
                      style={{ backgroundColor: '#0507070d' }}
                    />
                  </div>
                </div>

                {/* Radio section — padding-vertical padding-xsmall */}
                <div className="py-2">
                  <div className="mb-2">
                    <label className="block text-sm font-normal text-[#050707] mb-3">
                      How would you describe yourself?
                    </label>
                  </div>
                  {/* form_radio-2col: 2-col grid, col-gap 1.5rem, row-gap 0.875rem */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      columnGap: '1.5rem',
                      rowGap: '0.875rem',
                    }}
                  >
                    {roles.map((role) => (
                      <label
                        key={role}
                        className="flex items-center cursor-pointer text-sm text-[#050707] select-none"
                        style={{ paddingLeft: '1.125rem' }}
                      >
                        {/* form_radio-icon: 1.125rem circle, neutral-darkest-5 bg, thick border when checked */}
                        <span
                          className="shrink-0 rounded-full transition-all duration-200"
                          style={{
                            width: '1.125rem',
                            minWidth: '1.125rem',
                            height: '1.125rem',
                            minHeight: '1.125rem',
                            marginLeft: '-1.125rem',
                            marginRight: '0.5rem',
                            border: formData.role === role ? '6px solid #050707' : '1px solid transparent',
                            backgroundColor: formData.role === role ? '#fff' : '#0507070d',
                          }}
                        />
                        <input
                          type="radio"
                          name="role"
                          value={role}
                          checked={formData.role === role}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        {role}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message textarea */}
                <div>
                  <label htmlFor="message" className="block text-sm font-normal text-[#050707] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className={inputClasses + ' resize-none'}
                    placeholder="Tell us more"
                    style={{
                      backgroundColor: '#0507070d',
                      minHeight: '11.25rem',
                      paddingTop: '0.75rem',
                      paddingBottom: '0.75rem',
                    }}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-[#e23939] text-sm bg-red-50 px-4 py-2.5 rounded-lg">
                    Something didn&apos;t work. Please try again.
                  </p>
                )}

                {/* Submit — button (same as button-solid), left-aligned like Webflow input[type=submit] */}
                <div>
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="button-solid disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? 'Sending…' : 'Send'}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
