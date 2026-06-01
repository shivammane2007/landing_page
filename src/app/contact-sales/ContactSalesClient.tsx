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
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedGenerateButton from '@/components/ui/animated-generate-button-shadcn-tailwind';

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
    <div className="min-h-screen bg-[#f0f0ee] text-gray-900 selection:bg-blue-500 selection:text-white font-sans antialiased pb-20">
      
      {/* MINIMAL HEADER */}
      <header className="w-full px-6 py-6 sm:px-12 md:px-20 lg:px-28 flex justify-between items-center z-50">
        <Link 
          href="/" 
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300/40 bg-white/40 backdrop-blur-sm text-gray-600 hover:text-gray-900 transition-all hover:bg-white hover:border-gray-300 hover:shadow-sm"
        >
          <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          <span className="text-xs font-semibold uppercase tracking-wider">Back to Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Bionic Clinical Portal</span>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative px-6 sm:px-12 md:px-20 lg:px-28 pt-8 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-6">
              <Activity size={12} />
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
            <div className="absolute inset-0 bg-radial-gradient from-blue-500/10 to-transparent blur-3xl pointer-events-none rounded-full w-72 h-72 mx-auto top-1/2 -translate-y-1/2" />
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
                src="/everyday_bionic_1780052326141.png" 
                alt="Premium Bionic Prosthetic" 
                className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
              />
            </motion.div>
          </div>

        </div>
      </section>

      {/* QUESTIONNAIRE CARD SECTION */}
      <section ref={formRef} className="px-4 sm:px-6 lg:px-8 py-8 relative z-20">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[32px] border border-gray-200/60 shadow-2xl overflow-hidden relative">
            
            {/* PROGRESS BAR */}
            {submitStatus !== 'success' && (
              <div className="h-1.5 w-full bg-gray-100 relative">
                <div 
                  className="h-full bg-blue-500 transition-all duration-500 ease-out" 
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            )}

            {submitStatus === 'idle' && (
              <div className="p-8 sm:p-12">
                
                {/* STEP INDICATORS */}
                <div className="flex items-center justify-between mb-10 text-xs font-semibold text-gray-400 tracking-wider">
                  <div className={`flex items-center gap-2 ${step >= 1 ? 'text-gray-900 font-bold' : ''}`}>
                    <span className={`h-5 w-5 rounded-full flex items-center justify-center border ${step > 1 ? 'bg-blue-500 border-blue-500 text-white' : step === 1 ? 'border-gray-900 text-gray-900' : 'border-gray-200'}`}>
                      {step > 1 ? <Check size={10} /> : '1'}
                    </span>
                    <span>PROFILE</span>
                  </div>
                  <div className="h-px bg-gray-200 flex-1 mx-4" />
                  <div className={`flex items-center gap-2 ${step >= 2 ? 'text-gray-900 font-bold' : ''}`}>
                    <span className={`h-5 w-5 rounded-full flex items-center justify-center border ${step > 2 ? 'bg-blue-500 border-blue-500 text-white' : step === 2 ? 'border-gray-900 text-gray-900' : 'border-gray-200'}`}>
                      {step > 2 ? <Check size={10} /> : '2'}
                    </span>
                    <span>SOLUTION</span>
                  </div>
                  <div className="h-px bg-gray-200 flex-1 mx-4" />
                  <div className={`flex items-center gap-2 ${step >= 3 ? 'text-gray-900 font-bold' : ''}`}>
                    <span className={`h-5 w-5 rounded-full flex items-center justify-center border ${step > 3 ? 'bg-blue-500 border-blue-500 text-white' : step === 3 ? 'border-gray-900 text-gray-900' : 'border-gray-200'}`}>
                      {step > 3 ? <Check size={10} /> : '3'}
                    </span>
                    <span>TIMELINE</span>
                  </div>
                  <div className="h-px bg-gray-200 flex-1 mx-4" />
                  <div className={`flex items-center gap-2 ${step >= 4 ? 'text-gray-900 font-bold' : ''}`}>
                    <span className={`h-5 w-5 rounded-full flex items-center justify-center border ${step === 4 ? 'border-gray-900 text-gray-900' : 'border-gray-200'}`}>
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
                            className={`peer w-full pl-12 pr-4 pt-6 pb-2 rounded-2xl border text-sm text-gray-900 bg-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all ${errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200'}`}
                          />
                          <label 
                            htmlFor="name" 
                            className="absolute left-12 top-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-placeholder-shown:lowercase peer-placeholder-shown:first-letter:uppercase peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:text-blue-500 select-none pointer-events-none"
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
                            className={`peer w-full pl-12 pr-4 pt-6 pb-2 rounded-2xl border text-sm text-gray-900 bg-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200'}`}
                          />
                          <label 
                            htmlFor="email" 
                            className="absolute left-12 top-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-placeholder-shown:lowercase peer-placeholder-shown:first-letter:uppercase peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:text-blue-500 select-none pointer-events-none"
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
                            className={`peer w-full pl-12 pr-4 pt-6 pb-2 rounded-2xl border text-sm text-gray-900 bg-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all ${errors.phone ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200'}`}
                          />
                          <label 
                            htmlFor="phone" 
                            className="absolute left-12 top-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-placeholder-shown:lowercase peer-placeholder-shown:first-letter:uppercase peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:text-blue-500 select-none pointer-events-none"
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
                            className={`peer w-full pl-12 pr-4 pt-6 pb-2 rounded-2xl border text-sm text-gray-900 bg-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all ${errors.country ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200'}`}
                          />
                          <label 
                            htmlFor="country" 
                            className="absolute left-12 top-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-placeholder-shown:lowercase peer-placeholder-shown:first-letter:uppercase peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:text-blue-500 select-none pointer-events-none"
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
                            className={`peer w-full pl-12 pr-4 pt-6 pb-2 rounded-2xl border text-sm text-gray-900 bg-white placeholder-transparent focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all ${errors.occupation ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200'}`}
                          />
                          <label 
                            htmlFor="occupation" 
                            className="absolute left-12 top-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:font-normal peer-placeholder-shown:lowercase peer-placeholder-shown:first-letter:uppercase peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:text-blue-500 select-none pointer-events-none"
                          >
                            Occupation
                          </label>
                          {errors.occupation && <p className="text-xs text-red-500 mt-1 pl-2 font-medium">{errors.occupation}</p>}
                        </div>

                        {/* Situation Select */}
                        <div className="relative">
                          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                            <Building size={16} />
                          </div>
                          <select
                            name="situation"
                            id="situation"
                            value={formData.situation}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 pt-6 pb-2 rounded-2xl border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                          >
                            <option value="Personal Use">Personal Use</option>
                            <option value="Hospital">Hospital</option>
                            <option value="Clinic">Clinic</option>
                            <option value="Rehabilitation Center">Rehabilitation Center</option>
                            <option value="Research">Research</option>
                            <option value="Enterprise">Enterprise</option>
                          </select>
                          <label 
                            htmlFor="situation" 
                            className="absolute left-12 top-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider select-none pointer-events-none"
                          >
                            Current Situation
                          </label>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400 text-xs">
                            ▼
                          </div>
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
                            className={`p-6 text-left rounded-2xl border-2 transition-all flex flex-col justify-between h-40 ${formData.solution === opt.title ? 'border-blue-500 bg-blue-50/20 shadow-md ring-4 ring-blue-500/5' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'}`}
                          >
                            <div className="flex justify-between items-start w-full">
                              <span className="text-base font-bold text-gray-900">{opt.title}</span>
                              <div className={`h-5 w-5 rounded-full flex items-center justify-center border transition-all ${formData.solution === opt.title ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-200'}`}>
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
                            className={`w-full p-5 text-left rounded-2xl border-2 transition-all flex items-center justify-between ${formData.timeframe === opt.title ? 'border-blue-500 bg-blue-50/20 shadow-md ring-4 ring-blue-500/5' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'}`}
                          >
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-gray-900">{opt.title}</span>
                              <span className="text-xs text-gray-500 mt-1">{opt.subtitle}</span>
                            </div>
                            <div className={`h-5 w-5 rounded-full flex items-center justify-center border transition-all shrink-0 ml-4 ${formData.timeframe === opt.title ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-200'}`}>
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
                        
                        {/* Static calendar simulation */}
                        <div className="md:col-span-6 bg-gray-50/80 p-5 rounded-2xl border border-gray-100">
                          <div className="flex justify-between items-center mb-4 px-2">
                            <span className="text-sm font-bold text-gray-900">June 2026</span>
                            <div className="flex gap-2 text-gray-400">
                              <ChevronLeft size={16} className="cursor-not-allowed" />
                              <ChevronRight size={16} className="cursor-not-allowed" />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-400 mb-2">
                            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                          </div>
                          
                          <div className="grid grid-cols-7 gap-1 text-center text-xs">
                            {/* Empty pads for starting day */}
                            <span className="py-2 text-gray-300">31</span>
                            {[...Array(14)].map((_, i) => {
                              const day = i + 1;
                              const isAvailable = day >= 8 && day <= 12;
                              return (
                                <button
                                  type="button"
                                  key={day}
                                  disabled={!isAvailable}
                                  className={`py-2 rounded-lg font-medium transition-all ${isAvailable ? 'text-gray-900 hover:bg-blue-500 hover:text-white cursor-pointer bg-white border border-gray-100 shadow-sm font-bold' : 'text-gray-300 pointer-events-none'}`}
                                >
                                  {day}
                                </button>
                              );
                            })}
                            {[...Array(16)].map((_, i) => {
                              const day = i + 15;
                              return (
                                <span key={day} className="py-2 text-gray-300 font-normal">{day}</span>
                              );
                            })}
                          </div>
                          <div className="mt-4 pt-3 border-t border-gray-200/50 flex items-center gap-2 text-[10px] text-gray-400 font-medium justify-center">
                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                            <span>Highlighted days contain clinical slots</span>
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
                                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between text-xs ${isSelected ? 'border-blue-500 bg-blue-50/20 font-bold ring-2 ring-blue-500/5' : 'border-gray-100 hover:border-gray-200 bg-white hover:bg-gray-50'}`}
                                >
                                  <div className="flex items-center gap-3">
                                    <Clock size={12} className="text-gray-400" />
                                    <span>{slot.dayName}, {slot.dateStr}</span>
                                  </div>
                                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}>{slot.time}</span>
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
                      <ChevronLeft size={16} />
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
                      <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleBookConsultation}
                      className="inline-flex items-center gap-1.5 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-blue-500/10 cursor-pointer ml-auto"
                    >
                      <CalendarIcon size={16} />
                      <span>Confirm Booking</span>
                    </button>
                  )}
                </div>

              </div>
            )}

            {/* SUBMIT LOADING STATE */}
            {submitStatus === 'loading' && (
              <div className="p-12 sm:p-20 flex flex-col items-center justify-center text-center space-y-6">
                <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
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
                <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 border border-green-100 shadow-sm">
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
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase text-[9px] tracking-wide">SECURE MEETING</span>
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
                  <ArrowLeft size={16} />
                  <span>Return to Home</span>
                </Link>
              </motion.div>
            )}

          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="max-w-6xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28 py-20 border-t border-gray-300/30 mt-12">
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest block mb-2">Proven Clinical Impact</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Why people choose us.</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { stat: "10,000+", label: "Lives Improved", desc: "Engineered limbs that have returned patients to active careers and daily independence." },
            { stat: "98%", label: "Satisfaction", desc: "Highest satisfaction score in clinical trials for usability, calibration, and comfort." },
            { stat: "25+", label: "Countries Supported", desc: "A global web of certified clinics, rehabilitation counselors, and field support teams." },
            { stat: "24/7", label: "Specialist Support", desc: "Ongoing calibration support, technical troubleshooting, and direct clinic assistance." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200/50 shadow-sm flex flex-col justify-between">
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">{item.stat}</span>
              <div className="mt-4">
                <span className="text-sm font-bold text-gray-900 block mb-1">{item.label}</span>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ELASTIC GRID SECTION */}
      <section className="max-w-6xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28 py-20 border-t border-gray-300/30">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-mono uppercase tracking-widest mb-3 text-blue-500">
            Engineered For Freedom
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight mb-3">Designed for real-world mobility</h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">Advanced prosthetics engineered for active comfort, natural movement, and direct neural feedback.</p>
        </div>

        {/* Elastic accordion */}
        <div className="flex flex-col md:flex-row gap-4 w-full h-[600px] mt-10">
          {bionicFeatures.map((item, i) => (
            <motion.div
              key={i}
              layout
              onClick={() => setActive(i)}
              className={cn(
                "relative rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                active === i ? "flex-[10]" : "flex-[1] bg-white hover:bg-neutral-200"
              )}
            >
              {/* Background image & Overlay */}
              <motion.div
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: active === i ? 1 : 0 }}
              >
                <img src={item.img} className="w-full h-full object-cover" alt="" />
                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
              </motion.div>

              {/* Vertical label (inactive) */}
              <div className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                active === i ? "opacity-0 pointer-events-none" : "opacity-100"
              )}>
                <h3 className="transform -rotate-90 text-xl font-bold text-neutral-400 whitespace-nowrap uppercase tracking-widest">
                  {item.label}
                </h3>
              </div>

              {/* Expanded content */}
              <div className={cn(
                "relative h-full flex flex-col justify-end p-8 md:p-12 transition-opacity duration-500 delay-100",
                active === i ? "opacity-100" : "opacity-0 pointer-events-none"
              )}>
                <span
                  className="text-xs font-mono uppercase tracking-widest mb-4 px-3 py-1 rounded-full w-fit bg-blue-500/90 text-white drop-shadow-md"
                >
                  {item.label}
                </span>
                <motion.h2 layout="position" className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight drop-shadow-lg">
                  {item.heading}
                </motion.h2>
                <motion.p layout="position" className="text-sm md:text-base text-white/90 max-w-lg drop-shadow-md">
                  {item.sub}
                </motion.p>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToForm();
                  }}
                  whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-6 py-3 border border-white text-white rounded-full w-fit font-medium transition-colors cursor-pointer text-xs uppercase tracking-wider"
                >
                  Book Free Assessment →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MEET YOUR SPECIALISTS */}
      <section className="max-w-6xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28 py-20 border-t border-gray-300/30">
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest block mb-2">Clinical Oversight</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Meet your specialists.</h2>
          <p className="text-sm text-gray-500 mt-2 max-w-lg mx-auto">World-class clinical managers and bionics researchers who design, calibrate, and support your setup.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specialists.map((spec, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-gray-200/50 shadow-sm flex flex-col h-full group">
              <div className="h-64 relative bg-gray-50 overflow-hidden shrink-0">
                <img 
                  src={spec.image} 
                  alt={spec.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-gray-900 shadow-sm">
                  {spec.experience}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-0.5">{spec.name}</h3>
                  <span className="text-xs text-blue-500 font-semibold uppercase tracking-wider block mb-4">{spec.role}</span>
                  <p className="text-xs text-gray-500 leading-relaxed">{spec.bio}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <span>Clinical Lead</span>
                  <span className="text-green-500 flex items-center gap-1">● Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL MINI SECTION */}
      <section className="max-w-6xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28 py-20 border-t border-gray-300/30">
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest block mb-2">Patient Voices</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Real experiences. Real freedom.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200/50 shadow-sm flex flex-col justify-between h-full">
              <p className="text-sm text-gray-600 leading-relaxed italic mb-8">
                "{test.quote}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="h-8 w-8 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-xs">
                  {test.author.charAt(0)}
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-900 block">{test.author}</span>
                  <span className="text-[10px] text-gray-400 block">{test.role}, {test.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="max-w-6xl mx-auto px-6 sm:px-12 md:px-20 lg:px-28 py-20 border-t border-gray-300/30">
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest block mb-2">The Journey</span>
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
            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200/50 shadow-sm flex flex-col justify-between relative z-10">
              <span className="h-8 w-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-xs mb-6 shadow-md shadow-blue-500/10">
                {item.step}
              </span>
              <div>
                <span className="text-sm font-bold text-gray-900 block mb-1">{item.title}</span>
                <p className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-900 text-white rounded-[32px] p-8 sm:p-16 border border-gray-800 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
          {/* Subtle accent light */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
          
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 max-w-lg leading-tight relative z-10">
            Ready to take the next step?
          </h2>
          
          <p className="text-gray-400 text-sm sm:text-base mb-10 max-w-md relative z-10">
            Begin your bionic mobility assessment today. Select your preferred slot and our clinical engineers will do the rest.
          </p>
          
          <button 
            type="button"
            onClick={scrollToForm}
            className="px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-lg cursor-pointer relative z-10"
          >
            Schedule Consultation
          </button>
        </div>
      </section>

    </div>
  );
}
