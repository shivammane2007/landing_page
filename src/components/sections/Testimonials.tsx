"use client";

import { TestimonialsSection } from "@/components/ui/simple-animated-testimonials";

import { testimonials } from '@/lib/data/testimonials';

export default function Testimonials() {

  const mappedTestimonials = testimonials.map((t) => ({
    id: t.id,
    name: t.name,
    role: t.occupation,
    company: t.location,
    content: t.quote,
    rating: t.rating,
    avatar: t.avatar,
  }));

  return (
    <TestimonialsSection
      className="bg-[#f0f0ee] w-full"
      title="Stories from people who never stopped moving."
      subtitle="Join thousands of users who have reclaimed their mobility, independence, and confidence."
      testimonials={mappedTestimonials}
      trustedCompanies={["Mayo Clinic", "Cleveland Clinic", "Johns Hopkins", "Stanford Health", "Mass General", "UCLA Health"]}
      trustedCompaniesTitle="Trusted by leading healthcare institutions"
    />
  );
}
