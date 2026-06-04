"use client";

import React, { useMemo } from 'react';
import { TestimonialsSection } from "@/components/ui/simple-animated-testimonials";
import { testimonials } from '@/lib/data/testimonials';

const Testimonials = () => {
  const mappedTestimonials = useMemo(() => testimonials.map((t) => ({
    id: t.id,
    name: t.name,
    role: t.occupation,
    company: t.location,
    content: t.quote,
    rating: t.rating,
    avatar: t.avatar,
  })), []);

  const trustedCompanies = useMemo(() => ["Mayo Clinic", "Cleveland Clinic", "Johns Hopkins", "Stanford Health", "Mass General", "UCLA Health"], []);

  return (
    <TestimonialsSection
      className="bg-[#f0f0ee] w-full"
      title="Stories from people who never stopped moving."
      subtitle="Join thousands of users who have reclaimed their mobility, independence, and confidence."
      testimonials={mappedTestimonials}
      trustedCompanies={trustedCompanies}
      trustedCompaniesTitle="Trusted by leading healthcare institutions"
    />
  );
};

export default React.memo(Testimonials);
