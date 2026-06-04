"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Briefcase, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Shield, 
  Star, 
  Heart, 
  Award, 
  Loader2, 
  CheckCircle,
  Building,
  Activity,
  Layers,
  Users,
  Monitor
} from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedGenerateButton from '@/components/ui/animated-generate-button-shadcn-tailwind';
import { Calendar } from '@/components/ui/calendar-rac';
import StatsClay from '@/src/components/ContentBlocks/StatsSections/tsx/StatsClay';
import { ComboBox, Input as ComboInput, ListBox } from '@/components/ui/heroui-combo-box';

// Specialist Profiles
const specialists = [
  {
    name: "Dr. Sarah Johnson",
    role: "Clinical Prosthetics Lead",
    experience: "12 Years Experience",
    image: "/surgeon_prosthetic_1780080439095.png",
    bio: "Former Chief of Rehabilitation at Johns Hopkins, specialized in sensory feedback systems."
  },
  {
    name: "Marcus Vance",
    role: "Bionics Design Lead",
    experience: "8 Years Experience",
    image: "/robotic_arm_lab_1780052286571.png",
    bio: "Ex-NASA robotics engineer, pioneer in lightweight multi-axis mechanical joints."
  },
  {
    name: "Dr. David Chen",
    role: "Rehabilitation Director",
    experience: "15 Years Experience",
    image: "/athlete_prosthetic_1780052307449.png",
    bio: "Physical therapist expert dedicated to sports kinematics and adaptive running blades."
  }
];

// Testimonials
const testimonials = [
  {
    quote: "Reclaiming the ability to cook and paint has given me my life back. The calibration was incredibly intuitive.",
    author: "Fatima",
    role: "Homemaker",
    location: "Dubai"
  },
  {
    quote: "As a clinician, I’ve never seen a device integrate so quickly into a patient’s daily routine. The control algorithm is light-years ahead.",
    author: "Dr. Julian Alvarez",
    role: "Clinical Director",
    location: "Madrid"
  },
  {
    quote: "The running blade and smart forearm combined have made competitive training possible again. Exceptional support.",
    author: "Hiroshi",
    role: "Para-athlete",
    location: "Tokyo"
  }
];

// Features for themed ElasticGrid
const bionicFeatures = [
  {
    label: "Calibration",
    heading: "AI-Powered Signal Calibration",
    sub: "Our neural model trains in real-time to match your exact muscle signal patterns. Reclaim natural movement in minutes.",
    img: "/robotic_joints_1780052347211.png",
  },
  {
    label: "Socket Design",
    heading: "Custom Ergonomic Fabrication",
    sub: "Individually 3D-modeled and breathable sockets ensure a frictionless, all-day fit tailored to your limb anatomy.",
    img: "/robotic_arm_lab_1780052286571.png",
  },
  {
    label: "Clinical Support",
    heading: "Direct Clinical Fitting Leads",
    sub: "Receive direct, one-on-one sessions with certified prosthetists to adjust, tune, calibrate, and master your device.",
    img: "/surgeon_prosthetic_1780080439095.png",
  },
  {
    label: "Performance",
    heading: "All-Day Active Battery Life",
    sub: "Lightweight power cells run active motorized joints and multi-grip patterns for 24+ hours on a single charge.",
    img: "/athlete_prosthetic_1780052307449.png",
  },
];

// Calendar Slots
interface TimeSlot {
  id: string;
  dayName: string;
  dateStr: string;
  time: string;
}

const mockSlots: TimeSlot[] = [
  { id: '1', dayName: 'Monday', dateStr: 'June 8', time: '10:00 AM' },
  { id: '2', dayName: 'Monday', dateStr: 'June 8', time: '2:00 PM' },
  { id: '3', dayName: 'Tuesday', dateStr: 'June 9', time: '11:00 AM' },
  { id: '4', dayName: 'Tuesday', dateStr: 'June 9', time: '4:00 PM' },
  { id: '5', dayName: 'Wednesday', dateStr: 'June 10', time: '9:30 AM' },
  { id: '6', dayName: 'Wednesday', dateStr: 'June 10', time: '1:30 PM' },
  { id: '7', dayName: 'Thursday', dateStr: 'June 11', time: '3:00 PM' },
  { id: '8', dayName: 'Friday', dateStr: 'June 12', time: '10:30 AM' }
];

export default function ContactSalesClient() {
  const formRef = useRef<HTMLDivElement>(null);
  
  const timelineCardVariants: any = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };
  
  // Active state for themed ElasticGrid
  const [active, setActive] = useState(0);
  
  // Current Questionnaire Step (1 to 4)
  const [step, setStep] = useState(1);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    occupation: '',
    situation: 'Personal Use',
    solution: '',
    timeframe: '',
    selectedSlot: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Input Change Handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Option select handlers
  const handleSelectOption = (field: 'solution' | 'timeframe' | 'selectedSlot', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Validate Step 1
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Please enter your full name';
    
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email address';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (formData.phone.replace(/[^0-9]/g, '').length < 7) newErrors.phone = 'Enter a valid phone number';
    
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigate Next
  const handleNextStep = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else if (step === 2) {
      if (!formData.solution) {
        setErrors({ solution: 'Please choose a prosthetic solution' });
      } else {
        setErrors({});
        setStep(3);
      }
    } else if (step === 3) {
      if (!formData.timeframe) {
        setErrors({ timeframe: 'Please choose a timeline' });
      } else {
        setErrors({});
        setStep(4);
      }
    }
  };

  // Navigate Back
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  // Final Consultation Booking
  const handleBookConsultation = async () => {
    if (!formData.selectedSlot) {
      setErrors({ selectedSlot: 'Please choose an available time slot' });
      return;
    }
    
    setSubmitStatus('loading');
    
    // Simulate a premium, secure network delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    setSubmitStatus('success');
  };

  // Scroll to Form
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-[#f0f0ee] text-gray-900 selection:bg-purple-600 selection:text-white font-sans antialiased pb-20">
      
      {/* MINIMAL HEADER */}
      <header className="w-full px-6 py-6 sm:px-12 md:px-20 lg:px-28 flex justify-between items-center z-50">
        <Link 
          href="/" 
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300/40 bg-white/40 backdrop-blur-sm text-gray-600 hover:text-gray-900 transition-all hover:bg-white hover:border-gray-300 hover:shadow-sm"
        >
          <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-0.5 shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-wider">Back to Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-purple-600 animate-pulse"></span>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Bionic Clinical Portal</span>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative px-6 sm:px-12 md:px-20 lg:px-28 pt-8 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-semibold mb-6">
              <Activity size={12} className="shrink-0" />
              <span>Personalized Assessment & Consultation</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.05] mb-6">
              Let's build your<br/>path to independence.
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 font-normal leading-relaxed max-w-xl">
              Speak directly with our specialists and discover which prosthetic solution is right for you. Get a dedicated custom fitting, custom calibration, and ongoing guidance.
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center relative">
            {/* Background Radial Glow */}
            <div className="absolute inset-0 bg-radial-gradient from-purple-600/10 to-transparent blur-3xl pointer-events-none rounded-full w-72 h-72 mx-auto top-1/2 -translate-y-1/2" />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10 w-full max-w-[340px] md:max-w-[400px] aspect-[4/5] flex items-center justify-center"
            >
              <img 
                src="https://images.unsplash.com/photo-1779952747150-0fe7c299332b?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Premium Bionic Prosthetic" 
                className="w-full h-full object-cover rounded-2xl filter shadow-2xl"
              />
            </motion.div>
          </div>

        </div>
      </section>

      {/* QUESTIONNAIRE CARD SECTION */}
      <section ref={formRef} className="px-4 sm:px-6 lg:px-8 py-8 relative z-20">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[32px] border border-gray-200/60 shadow-2xl relative">
            
            {/* PROGRESS BAR */}
            {submitStatus !== 'success' && (
              <div className="h-1.5 w-full bg-gray-100 relative rounded-t-[32px] overflow-hidden">
                <div 
                  className="h-full bg-purple-600 transition-all duration-500 ease-out" 
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            )}

            {submitStatus === 'idle' && (
              <div className="p-8 sm:p-12">
                
                {/* STEP INDICATORS */}
                <div className="flex items-center justify-between mb-10 text-xs font-semibold text-gray-400 tracking-wider">
                  <div className={`flex items-center gap-2 ${step >= 1 ? 'text-gray-900 font-bold' : ''}`}>
                    <span className={`h-5 w-5 shrink-0 rounded-full flex items-center justify-center border ${step > 1 ? 'bg-purple-600 border-purple-600 text-white' : step === 1 ? 'border-gray-900 text-gray-900' : 'border-gray-200'}`}>
                      {step > 1 ? <Check size={10} /> : '1'}
                    </span>
                    <span>PROFILE</span>
                  </div>
                  <div className="h-px bg-gray-200 flex-1 mx-4" />
                  <div className={`flex items-center gap-2 ${step >= 2 ? 'text-gray-900 font-bold' : ''}`}>
                    <span className={`h-5 w-5 shrink-0 rounded-full flex items-center justify-center border ${step > 2 ? 'bg-purple-600 border-purple-600 text-white' : step === 2 ? 'border-gray-900 text-gray-900' : 'border-gray-200'}`}>
                      {step > 2 ? <Check size={10} /> : '2'}
                    </span>
                    <span>SOLUTION</span>
                  </div>
                  <div className="h-px bg-gray-200 flex-1 mx-4" />
                  <div className={`flex items-center gap-2 ${step >= 3 ? 'text-gray-900 font-bold' : ''}`}>
                    <span className={`h-5 w-5 shrink-0 rounded-full flex items-center justify-center border ${step > 3 ? 'bg-purple-600 border-purple-600 text-white' : step === 3 ? 'border-gray-900 text-gray-900' : 'border-gray-200'}`}>
                      {step > 3 ? <Check size={10} /> : '3'}
                    </span>
                    <span>TIMELINE</span>
                  </div>
                  <div className="h-px bg-gray-200 flex-1 mx-4" />
                  <div className={`flex items-center gap-2 ${step >= 4 ? 'text-gray-900 font-bold' : ''}`}>
                    <span className={`h-5 w-5 shrink-0 rounded-full flex items-center justify-center border ${step === 4 ? 'border-gray-900 text-gray-900' : 'border-gray-200'}`}>
                      4
                    </span>
                    <span>SCHEDULE</span>
                  </div>
                </div>

                {/* FORM CONTENT WITH ANIMATION */}
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: Who are you? */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-8"
                    >
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2">Tell us about yourself</h2>
                        <p className="text-sm text-gray-500">Provide your basic information so we can customize your clinical consultation.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Name Input */}
                        <div className="relative">
                          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                            <User size={16} />
                          </div>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            className={`peer w-full pl-12 pr-4 pt-6 pb-2 rounded-2xl border text-sm text-gray-900 bg-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-purple-600/10 focus:border-purple-600 transition-all ${errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200'}`}
                          />
                          <label 
                            htmlFor="name" 
                            className="absolute left-12 top-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-placeholder-shown:lowercase peer-placeholder-shown:first-letter:uppercase peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:text-purple-600 select-none pointer-events-none"
                          >
                            Full Name
                          </label>
                          {errors.name && <p className="text-xs text-red-500 mt-1 pl-2 font-medium">{errors.name}</p>}
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                            <Mail size={16} />
                          </div>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email Address"
                            className={`peer w-full pl-12 pr-4 pt-6 pb-2 rounded-2xl border text-sm text-gray-900 bg-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-purple-600/10 focus:border-purple-600 transition-all ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200'}`}
                          />
                          <label 
                            htmlFor="email" 
                            className="absolute left-12 top-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-placeholder-shown:lowercase peer-placeholder-shown:first-letter:uppercase peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:text-purple-600 select-none pointer-events-none"
                          >
                            Email Address
                          </label>
                          {errors.email && <p className="text-xs text-red-500 mt-1 pl-2 font-medium">{errors.email}</p>}
                        </div>

                        {/* Phone Input */}
                        <div className="relative">
                          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                            <Phone size={16} />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone Number"
                            className={`peer w-full pl-12 pr-4 pt-6 pb-2 rounded-2xl border text-sm text-gray-900 bg-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-purple-600/10 focus:border-purple-600 transition-all ${errors.phone ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200'}`}
                          />
                          <label 
                            htmlFor="phone" 
                            className="absolute left-12 top-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-placeholder-shown:lowercase peer-placeholder-shown:first-letter:uppercase peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:text-purple-600 select-none pointer-events-none"
                          >
                            Phone Number
                          </label>
                          {errors.phone && <p className="text-xs text-red-500 mt-1 pl-2 font-medium">{errors.phone}</p>}
                        </div>

                        {/* Country Input */}
                        <div className="relative">
                          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                            <Globe size={16} />
                          </div>
                          <input
                            type="text"
                            name="country"
                            id="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            placeholder="Country"
                            className={`peer w-full pl-12 pr-4 pt-6 pb-2 rounded-2xl border text-sm text-gray-900 bg-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-purple-600/10 focus:border-purple-600 transition-all ${errors.country ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200'}`}
                          />
                          <label 
                            htmlFor="country" 
                            className="absolute left-12 top-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-placeholder-shown:lowercase peer-placeholder-shown:first-letter:uppercase peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:text-purple-600 select-none pointer-events-none"
                          >
                            Country
                          </label>
                          {errors.country && <p className="text-xs text-red-500 mt-1 pl-2 font-medium">{errors.country}</p>}
                        </div>

                        {/* Occupation Input */}
                        <div className="relative">
                          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                            <Briefcase size={16} />
                          </div>
                          <input
                            type="text"
                            name="occupation"
                            id="occupation"
                            value={formData.occupation}
                            onChange={handleInputChange}
                            placeholder="Occupation"
                            className={`peer w-full pl-12 pr-4 pt-6 pb-2 rounded-2xl border text-sm text-gray-900 bg-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-purple-600/10 focus:border-purple-600 transition-all ${errors.occupation ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200'}`}
                          />
                          <label 
                            htmlFor="occupation" 
                            className="absolute left-12 top-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-placeholder-shown:lowercase peer-placeholder-shown:first-letter:uppercase peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:text-purple-600 select-none pointer-events-none"
                          >
                            Occupation
                          </label>
                          {errors.occupation && <p className="text-xs text-red-500 mt-1 pl-2 font-medium">{errors.occupation}</p>}
                        </div>

                        {/* Situation Select */}
                        <div className="relative">
                          <ComboBox 
                            name="situation"
                            className="w-full"
                            selectedKey={formData.situation}
                            onSelectionChange={(key) => {
                              if (key) {
                                setFormData(prev => ({ ...prev, situation: String(key) }));
                              }
                            }}
                          >
                            <ComboBox.InputGroup className="relative w-full">
                              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 z-10">
                                <Building size={16} />
                              </div>
                              <ComboInput 
                                placeholder="Current Situation"
                                readOnly={true}
                                className="!cursor-pointer !w-full !pl-12 !pr-10 !pt-6 !pb-2 !rounded-2xl !border !text-sm !text-gray-900 !bg-white !placeholder-transparent !focus:outline-none !focus:ring-4 !focus:ring-purple-600/10 !focus:border-purple-600 !transition-all !border-gray-200"
                              />
                              <label 
                                className="absolute left-12 top-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider select-none pointer-events-none z-10"
                              >
                                Current Situation
                              </label>
                              <ComboBox.Trigger className="absolute inset-y-0 right-4 flex items-center text-gray-400 text-xs">
                                <span className="text-[10px]">▼</span>
                              </ComboBox.Trigger>
                            </ComboBox.InputGroup>
                            <ComboBox.Popover className="!absolute !z-50 !top-[calc(100%+.25rem)] !inset-inline-start-0 !w-full !min-w-[100%] !overflow-y-auto !overscroll-behavior-contain !border !border-gray-200/80 !bg-white !text-gray-900 !p-1.5 !rounded-2xl !max-h-[260px] !shadow-2xl">
                              <ListBox className="!p-1 !gap-1">
                                <ListBox.Item id="Personal Use" textValue="Personal Use" className="!rounded-xl !p-3">
                                  Personal Use
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="Hospital" textValue="Hospital" className="!rounded-xl !p-3">
                                  Hospital
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="Clinic" textValue="Clinic" className="!rounded-xl !p-3">
                                  Clinic
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="Rehabilitation Center" textValue="Rehabilitation Center" className="!rounded-xl !p-3">
                                  Rehabilitation Center
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="Research" textValue="Research" className="!rounded-xl !p-3">
                                  Research
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="Enterprise" textValue="Enterprise" className="!rounded-xl !p-3">
                                  Enterprise
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="Non-Profit Organization" textValue="Non-Profit Organization" className="!rounded-xl !p-3">
                                  Non-Profit Organization
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="Government Agency" textValue="Government Agency" className="!rounded-xl !p-3">
                                  Government Agency
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="Educational Institution" textValue="Educational Institution" className="!rounded-xl !p-3">
                                  Educational Institution
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="Independent Practitioner" textValue="Independent Practitioner" className="!rounded-xl !p-3">
                                  Independent Practitioner
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="Other" textValue="Other" className="!rounded-xl !p-3">
                                  Other
                                  <ListBox.ItemIndicator />
                                </ListBox.Item>
                              </ListBox>
                            </ComboBox.Popover>
                          </ComboBox>
                        </div>

                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: What solution are you looking for? */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-8"
                    >
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2">What solution are you looking for?</h2>
                        <p className="text-sm text-gray-500">Select the option that best matches your target application or clinical need.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { id: 'upper', title: 'Upper Limb Bionics', desc: 'Smart bionic hand and forearm prosthetics with real-time muscular signal calibration.' },
                          { id: 'lower', title: 'Lower Limb Bionics', desc: 'Active motorized knees and orthoses engineered for dynamic walking kinematics.' },
                          { id: 'custom', title: 'Custom Engineering', desc: 'Individually fabricated configurations tailored for unique residual limb physiology.' },
                          { id: 'clinic', title: 'Clinical Suite', desc: 'Multi-device site deployments, clinical fitting software, and practitioner training modules.' }
                        ].map((opt) => (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => handleSelectOption('solution', opt.title)}
                            className={`p-6 text-left rounded-2xl border-2 transition-all flex flex-col justify-between h-40 ${formData.solution === opt.title ? 'border-purple-600 bg-purple-50/20 shadow-md ring-4 ring-purple-600/5' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'}`}
                          >
                            <div className="flex justify-between items-start w-full gap-3">
                              <span className="text-base font-bold text-gray-900">{opt.title}</span>
                              <div className={`h-5 w-5 shrink-0 rounded-full flex items-center justify-center border transition-all ${formData.solution === opt.title ? 'bg-purple-600 border-purple-600 text-white' : 'border-gray-200'}`}>
                                {formData.solution === opt.title && <Check size={10} />}
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed mt-2">{opt.desc}</p>
                          </button>
                        ))}
                      </div>
                      {errors.solution && <p className="text-xs text-red-500 mt-1 pl-2 font-medium">{errors.solution}</p>}
                    </motion.div>
                  )}

                  {/* STEP 3: How soon do you need assistance? */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-8"
                    >
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2">How soon do you need assistance?</h2>
                        <p className="text-sm text-gray-500">Choosing a timeline helps us prioritize consultations and queue clinical engineers.</p>
                      </div>

                      <div className="space-y-4 max-w-xl mx-auto">
                        {[
                          { id: 'now', title: 'Immediately / Urgent', subtitle: 'Limb fitting or replacement required within the next 30 days.' },
                          { id: 'soon', title: 'Within 1-3 Months', subtitle: 'Planning an upcoming clinical fitment or institutional purchase.' },
                          { id: 'later', title: 'Within 3-6 Months', subtitle: 'Evaluating options for future rehabilitation.' },
                          { id: 'research', title: 'Just Researching / Enterprise Future Study', subtitle: 'Exploring technologies for academic research or procurement portfolios.' }
                        ].map((opt) => (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => handleSelectOption('timeframe', opt.title)}
                            className={`w-full p-5 text-left rounded-2xl border-2 transition-all flex items-center justify-between ${formData.timeframe === opt.title ? 'border-purple-600 bg-purple-50/20 shadow-md ring-4 ring-purple-600/5' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'}`}
                          >
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-gray-900">{opt.title}</span>
                              <span className="text-xs text-gray-500 mt-1">{opt.subtitle}</span>
                            </div>
                            <div className={`h-5 w-5 rounded-full flex items-center justify-center border transition-all shrink-0 ml-4 ${formData.timeframe === opt.title ? 'bg-purple-600 border-purple-600 text-white' : 'border-gray-200'}`}>
                              {formData.timeframe === opt.title && <Check size={10} />}
                            </div>
                          </button>
                        ))}
                      </div>
                      {errors.timeframe && <p className="text-xs text-red-500 mt-1 pl-2 font-medium">{errors.timeframe}</p>}
                    </motion.div>
                  )}

                  {/* STEP 4: Schedule consultation */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-8"
                    >
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2">Schedule your clinical consultation</h2>
                        <p className="text-sm text-gray-500">Select an available secure consultation slot. Sessions are encrypted and run 30-45 mins.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                        
                        {/* Interactive React Aria Calendar */}
                        <div className="md:col-span-6 bg-gray-50/80 p-5 rounded-2xl border border-gray-100 flex flex-col items-center">
                          <Calendar className="w-full bg-transparent" />
                          <div className="mt-4 w-full pt-3 border-t border-gray-200/50 flex items-center gap-2 text-[10px] text-gray-400 font-medium justify-center">
                            <span className="h-2 w-2 rounded-full bg-purple-600" />
                            <span>Select a highlighted day to view slots</span>
                          </div>
                        </div>

                        {/* Available slots */}
                        <div className="md:col-span-6 space-y-3">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Available Slots (Jun 8 - Jun 12)</span>
                          <div className="grid grid-cols-1 gap-2 max-h-[220px] overflow-y-auto pr-1">
                            {mockSlots.map((slot) => {
                              const isSelected = formData.selectedSlot === `${slot.dayName}, ${slot.dateStr} at ${slot.time}`;
                              return (
                                <button
                                  type="button"
                                  key={slot.id}
                                  onClick={() => handleSelectOption('selectedSlot', `${slot.dayName}, ${slot.dateStr} at ${slot.time}`)}
                                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between text-xs ${isSelected ? 'border-purple-600 bg-purple-50/20 font-bold ring-2 ring-purple-600/5' : 'border-gray-100 hover:border-gray-200 bg-white hover:bg-gray-50'}`}
                                >
                                  <div className="flex items-center gap-3">
                                    <Clock size={12} className="text-gray-400 shrink-0" />
                                    <span>{slot.dayName}, {slot.dateStr}</span>
                                  </div>
                                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${isSelected ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}>{slot.time}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                      {errors.selectedSlot && <p className="text-xs text-red-500 mt-1 pl-2 font-medium">{errors.selectedSlot}</p>}
                    </motion.div>
                  )}

                </AnimatePresence>

                {/* FORM ACTIONS */}
                <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider px-4 py-2"
                    >
                      <ChevronLeft size={16} className="shrink-0" />
                      <span>Previous Step</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-gray-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors shadow-sm cursor-pointer ml-auto"
                    >
                      <span>Continue</span>
                      <ChevronRight size={16} className="shrink-0" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleBookConsultation}
                      className="inline-flex items-center gap-1.5 px-7 py-3.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-purple-600/10 cursor-pointer ml-auto"
                    >
                      <CalendarIcon size={16} className="shrink-0" />
                      <span>Confirm Booking</span>
                    </button>
                  )}
                </div>

              </div>
            )}

            {/* SUBMIT LOADING STATE */}
            {submitStatus === 'loading' && (
              <div className="p-12 sm:p-20 flex flex-col items-center justify-center text-center space-y-6">
                <Loader2 className="h-12 w-12 text-purple-600 animate-spin" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">Configuring Clinical Consultation...</h3>
                  <p className="text-sm text-gray-500 max-w-sm mx-auto">Connecting with clinical leads, securing end-to-end encrypted rooms, and preparing patient briefing guides.</p>
                </div>
              </div>
            )}

            {/* SUBMIT SUCCESS STATE */}
            {submitStatus === 'success' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 sm:p-16 flex flex-col items-center justify-center text-center space-y-8"
              >
                <div className="h-16 w-16 shrink-0 bg-green-50 rounded-full flex items-center justify-center text-green-600 border border-green-100 shadow-sm">
                  <CheckCircle size={32} />
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">Consultation Secured</h2>
                  <p className="text-gray-500 max-w-md mx-auto text-sm">
                    Thank you, <strong className="text-gray-900">{formData.name}</strong>. Your customized prosthetic assessment session is confirmed. We have sent the calendar invite and motor assessment guide to <strong className="text-gray-900">{formData.email}</strong>.
                  </p>
                </div>

                {/* Booking summary card */}
                <div className="w-full max-w-md bg-gray-50 border border-gray-200/50 rounded-2xl p-6 text-left space-y-4">
                  <div className="flex justify-between items-center text-xs border-b border-gray-200/50 pb-3">
                    <span className="font-bold text-gray-400 uppercase tracking-wider">Appointment Summary</span>
                    <span className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded font-bold uppercase text-[9px] tracking-wide">SECURE MEETING</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-400 block mb-1">Time & Date</span>
                      <strong className="text-gray-900 block">{formData.selectedSlot}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">Prosthetic Target</span>
                      <strong className="text-gray-900 block">{formData.solution}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">Assigned Specialist</span>
                      <strong className="text-gray-900 block">{specialists[0].name}</strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-1">Classification</span>
                      <strong className="text-gray-900 block">{formData.situation}</strong>
                    </div>
                  </div>
                </div>

                <Link 
                  href="/" 
                  className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-gray-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors shadow-sm"
                >
                  <ArrowLeft size={16} className="shrink-0" />
                  <span>Return to Home</span>
                </Link>
              </motion.div>
            )}

          </div>
        </div>
      </section>


      {/* PROCESS TIMELINE */}
      <section className="max-w-6xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28 py-20 border-t border-gray-300/30">
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold text-purple-600 uppercase tracking-widest block mb-2">The Journey</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Your journey starts here.</h2>
          <p className="text-sm text-gray-500 mt-2 max-w-lg mx-auto">A transparent, step-by-step clinical process tailored to prepare, design, fit, and deliver your prosthetic device.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {[
            { step: "1", title: "Book Consultation", desc: "Schedule a secure, initial briefing call with our clinical leads." },
            { step: "2", title: "Assessment", desc: "Perform a mobility profiling assessment to analyze kinematics." },
            { step: "3", title: "Custom Design", desc: "Iteratively fabricate your socket socket modeling and custom aesthetics." },
            { step: "4", title: "AI Calibration", desc: "Train your customized neural control model to mirror natural signals." },
            { step: "5", title: "Delivery & Fit", desc: "Receive your calibrated device with full safety certification." }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={timelineCardVariants}
              whileHover={{
                y: -10,
                boxShadow: `12px 12px 24px #c8cacc, -12px -12px 24px #ffffff`,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}
              className="group rounded-[2rem] flex flex-col justify-between p-8 cursor-default relative z-10"
              style={{
                backgroundColor: "#f0f0ee",
                boxShadow: `8px 8px 16px #d1d5db, -8px -8px 16px #ffffff`,
              }}
            >
              <span className="h-8 w-8 shrink-0 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs mb-6 shadow-md shadow-purple-600/10">
                {item.step}
              </span>
              <div>
                <span className="text-sm font-bold text-gray-900 block mb-2">{item.title}</span>
                <p className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS CLAY SECTION */}
      <StatsClay 
        stats={[
          { value: "50K+", label: "Units Deployed", icon: Layers },
          { value: "10K+", label: "Active Patients", icon: Users },
          { value: "99%", label: "Satisfaction Rate", icon: Heart },
          { value: "24h", label: "Battery Performance", icon: Monitor }
        ]}
        title="Built for Mobility, Designed for Life"
        subtitle="The clinical milestones and performance metrics behind our bionic prosthetics."
        accentColor="#9333ea"
      />

      {/* CTA SECTION */}
      <section className="w-full relative py-20 overflow-hidden">
        {/* Background dotted pattern */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#d1d5db_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&display=swap');
            .hand-drawn-font {
              font-family: 'Kalam', cursive;
            }
            .clay-card {
              border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
            }
            .clay-input {
              border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
            }
            .clay-btn {
              border-radius: 15px 225px 15px 255px/255px 15px 225px 15px;
            }
          `}</style>

          <div className="relative p-2 sm:p-4">
            {/* Red shadow offset */}
            <div className="absolute inset-0 bg-[#ff4d4f] clay-card translate-y-3 translate-x-2" />
            
            {/* Main Card */}
            <div className="bg-[#2A2A2A] text-white p-10 sm:p-16 relative flex flex-col items-center text-center clay-card overflow-hidden border-2 border-[#2A2A2A]">
              
              {/* Dashed curve top left */}
              <svg className="absolute top-0 left-0 w-32 h-32 text-gray-400 opacity-30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 50,0 C 50,25 25,50 0,50" stroke="currentColor" strokeWidth="2" strokeDasharray="6,6" />
              </svg>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 hand-drawn-font !text-white leading-tight z-10">
                Ready to transform your<br/>workflow?
              </h2>
              <p className="!text-gray-200 text-base sm:text-xl max-w-2xl mx-auto mb-10 hand-drawn-font z-10">
                Join thousands of teams already using Acme Platform to work smarter and achieve more.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto z-10">
                <input 
                  type="email" 
                  placeholder="Enter your email..." 
                  className="flex-1 bg-transparent border-2 border-gray-400 text-white placeholder-gray-400 px-5 py-3 outline-none focus:border-white transition-colors clay-input hand-drawn-font text-lg"
                />
                <button 
                  type="button"
                  onClick={scrollToForm}
                  className="px-8 py-3 bg-white text-gray-900 hover:bg-gray-100 font-bold transition-colors clay-btn hand-drawn-font text-lg shadow-sm"
                >
                  Start free trial
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
