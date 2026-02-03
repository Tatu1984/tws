"use client";

import { useState } from "react";
import { Send, Calendar, CheckCircle2, Clock, MapPin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const roles = [
  { value: "business-leader", label: "Business leader" },
  { value: "technical-founder", label: "Technical founder" },
  { value: "product-manager", label: "Product manager" },
  { value: "researcher", label: "Researcher" },
  { value: "investor", label: "Investor" },
  { value: "other", label: "Other" },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Thanks for reaching out! We'll be in touch soon.");
  };

  return (
    <section className="bg-[#fcfbf9] py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left side - Free consultation callout */}
            <div>
              <div className="bg-white rounded-2xl p-6 lg:p-8 mb-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#e57368]/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-[#e57368]" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold text-[#001a2b]">
                    Free Consultation
                  </h3>
                </div>
                <p className="text-[#050707]/70 mb-4 text-sm lg:text-base">
                  No commitment required. Schedule a discovery session to discuss your operational challenges.
                </p>

                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-[#050707]/70">
                    <Clock className="h-4 w-4 text-[#e57368]" />
                    <span>30 minute discovery session</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#050707]/70">
                    <CheckCircle2 className="h-4 w-4 text-[#e57368]" />
                    <span>Tailored solutions discussion</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#050707]/70">
                    <CheckCircle2 className="h-4 w-4 text-[#e57368]" />
                    <span>No pressure environment</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-[#050707]/70">
                    <CheckCircle2 className="h-4 w-4 text-[#e57368]" />
                    <span>Actionable insights</span>
                  </li>
                </ul>

                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-[#e57368] to-[#f3b44a] hover:from-[#d66358] hover:to-[#e3a43a] text-white rounded-full"
                  asChild
                >
                  <a
                    href="https://outlook.office365.com/book/TenSparrows"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Your Session
                  </a>
                </Button>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#001a2b] mb-4">
                  Contact Information
                </h3>
                <div className="flex items-center gap-3 text-[#050707]/70">
                  <MapPin className="h-5 w-5 text-[#e57368]" />
                  <span>Atlanta, GA 30318, United States</span>
                </div>
                <a
                  href="mailto:info@tensparrows.com"
                  className="flex items-center gap-3 text-[#050707]/70 hover:text-[#e57368] transition-colors"
                >
                  <Mail className="h-5 w-5 text-[#e57368]" />
                  <span>info@tensparrows.com</span>
                </a>
              </div>
            </div>

            {/* Right side - Contact form */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
              <h3 className="text-lg lg:text-xl font-semibold text-[#001a2b] mb-2">
                Send us a message
              </h3>
              <p className="text-[#050707]/60 mb-6 text-sm">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#001a2b] mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-[#050707]/60">
                    Thanks for reaching out. We&apos;ll be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-[#001a2b]">
                        First name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        placeholder="John"
                        className="border-gray-200 focus:border-[#e57368] focus:ring-[#e57368]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-[#001a2b]">
                        Last name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        placeholder="Doe"
                        className="border-gray-200 focus:border-[#e57368] focus:ring-[#e57368]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#001a2b]">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="john@company.com"
                      className="border-gray-200 focus:border-[#e57368] focus:ring-[#e57368]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#001a2b]">
                      Phone number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="border-gray-200 focus:border-[#e57368] focus:ring-[#e57368]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-[#001a2b]">
                      How would you describe yourself?
                    </Label>
                    <Select name="role">
                      <SelectTrigger className="border-gray-200 focus:border-[#e57368] focus:ring-[#e57368]">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-[#001a2b]">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      placeholder="Tell us about your project or challenge..."
                      rows={4}
                      className="border-gray-200 focus:border-[#e57368] focus:ring-[#e57368]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#e57368] to-[#f3b44a] hover:from-[#d66358] hover:to-[#e3a43a] text-white rounded-full h-11"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
