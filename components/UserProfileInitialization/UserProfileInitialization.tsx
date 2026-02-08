'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


export default function UserProfileInitialization({ onSuccess }: { onSuccess?: (profile: any) => void }) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    career: '',
    linkedin: ''
  };

  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isTransmitting) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isTransmitting]);

  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.firstName) newErrors.firstName = 'REQUIRED';
    if (!formState.lastName) newErrors.lastName = 'REQUIRED';
    
    if (!formState.email) {
      newErrors.email = 'REQUIRED';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'INVALID_FORMAT';
    }

    if (!formState.phone) {
      newErrors.phone = 'REQUIRED';
    } else if (!/^[0-9+\-\s()]*$/.test(formState.phone)) {
      newErrors.phone = 'NUMBERS_ONLY';
    }

    if (!formState.career) newErrors.career = 'REQUIRED';

    if (!formState.linkedin) {
      newErrors.linkedin = 'REQUIRED';
    } else if (!formState.linkedin.includes('linkedin.com')) {
      newErrors.linkedin = 'MUST_BE_LINKEDIN';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsTransmitting(true);
      setProgress(0);
      try {
        const payload = {
          first_name: formState.firstName,
          last_name: formState.lastName,
          email: formState.email,
          phone: formState.phone,
          career: formState.career,
          linkedin_url: formState.linkedin,
          id: crypto.randomUUID(),
        };

        const response = await fetch('/api/profiles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'TRANS_FAILURE');
        }

        // Simulate transmission completion animation
        setTimeout(() => {
          setIsComplete(true);
          setIsTransmitting(false);
          
          if (onSuccess) {
            onSuccess({
              name: `${formState.firstName} ${formState.lastName}`,
              career: formState.career,
              linkedin_url: formState.linkedin,
            });
          }

          // Reset form after a delay to allow user to see success
          setTimeout(() => {
            setIsComplete(false);
            setFormState(initialFormState);
          }, 3000);
        }, 1500);

      } catch (error: any) {
        console.error('Registration error:', error);
        setErrors({ submit: error.message });
        setIsTransmitting(false);
        setProgress(0);
      }
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setFormState(prev => ({ ...prev, [key]: value }));
    // Clear error when typing
    if (errors[key] || errors.submit) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        delete newErrors.submit;
        return newErrors;
      });
    }
  };

  const fields = [
    { id: 'FIRST_NAME', key: 'firstName', label: '[FIRST_NAME]', placeholder: 'e.g. ALPHA', half: true },
    { id: 'LAST_NAME', key: 'lastName', label: '[LAST_NAME]', placeholder: 'e.g. USER', half: true },
    { id: 'EMAIL_ADDRESS', key: 'email', label: '[EMAIL_ADDRESS]', placeholder: 'e.g. USER@MAINFRAME.SYS', half: true },
    { id: 'CONTACT_PHONE', key: 'phone', label: '[PHONE_NUMBER]', placeholder: '+00 000 000', half: true },
    { id: 'ACADEMIC_CAREER', key: 'career', label: '[ACADEMIC_CAREER]', placeholder: 'e.g. QUANTUM_COMPUTING', half: true },
    { id: 'LINKEDIN_URL', key: 'linkedin', label: '[LINKEDIN_URL]', placeholder: 'https://linkedin.com/in/user', half: true },
  ];

  return (
    <div className="w-full font-mono text-[12px]">
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        .scanline {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: rgba(224, 2, 95, 0.1);
          box-shadow: 0 0 10px rgba(224, 2, 95, 0.2);
          animation: scanline 8s linear infinite;
          pointer-events: none;
          z-index: 10;
        }
      `}</style>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-[500px] p-5 border border-[#333] bg-black/40 backdrop-blur-sm overflow-hidden"
      >
        {/* Scanline Effect */}
        <div className="scanline" />

        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#555]" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#555]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#555]" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#555]" />

        {/* Metadata */}
        <div className="absolute top-2 left-3 text-[8px] text-[#555] tracking-widest">
          VERSION: 2.0.6
        </div>
        <div className="absolute top-2 right-3 text-[8px] text-[#555] tracking-widest">
          LOC: LIMA_PE
        </div>

        <motion.h1 
          variants={itemVariants}
          className="text-white mb-4 tracking-[0.2em] text-center"
        >
          USER_PROFILE_INITIALIZATION
        </motion.h1>

        <form className="grid grid-cols-2 gap-x-4 gap-y-3" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <motion.div
              key={field.id}
              variants={itemVariants}
              className={`relative flex flex-col ${field.half ? 'col-span-1' : 'col-span-2'}`}
            >
              <label className="text-white mb-1.5 tracking-wider text-[10px]">
                {field.label}
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={formState[field.key as keyof typeof formState]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  onFocus={() => setFocusedField(field.id)}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full bg-transparent border-b py-1 outline-none text-white placeholder-[#444] transition-colors ${
                    errors[field.key] ? 'border-red-500' : 'border-[#333] focus:border-[#E0025F]'
                  }`}
                  disabled={isTransmitting}
                />
                <AnimatePresence>
                  {focusedField === field.id && !errors[field.key] && (
                    <motion.span
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 5 }}
                      className="absolute right-0 -top-5 text-[9px] font-bold text-[#E0025F] tracking-tighter"
                    >
                      ● ACTIVE
                    </motion.span>
                  )}
                  {errors[field.key] && (
                    <motion.span
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 5 }}
                      className="absolute right-0 top-1 text-[9px] font-bold text-red-500 tracking-tighter"
                    >
                      ! {errors[field.key]}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}

          <motion.div variants={itemVariants} className="col-span-2 mt-2">
            {errors.submit && (
              <div className="mb-2 text-[10px] text-red-500 font-bold tracking-tighter uppercase">
                ERROR: {errors.submit}
              </div>
            )}

            {!isTransmitting && !isComplete && (
              <button
                type="submit"
                className="w-full py-3 border border-[#E0025F] text-[#E0025F] hover:bg-[#E0025F] hover:text-white transition-all duration-300 tracking-[0.2em] uppercase font-bold text-[11px]"
              >
                [ TRANSMIT_DATA_TO_MAINFRAME ]
              </button>
            )}

            {isTransmitting && (
              <div className="w-full space-y-2">
                <div className="flex justify-between text-[10px] text-[#E0025F] tracking-widest">
                  <span>ENCRYPTING_DATA...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-[2px] bg-[#222]">
                  <motion.div 
                    className="h-full bg-[#E0025F]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {isComplete && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full py-3 text-center border border-[#E0025F] bg-[#E0025F] text-white tracking-[0.2em] text-[11px]"
              >
                TRANSMISSION_SUCCESSFUL
              </motion.div>
            )}
          </motion.div>
        </form>

        <div className="mt-4 pt-2 border-t border-[#111] text-[8px] text-[#444] flex justify-between">
          <span>SECURE_CONNECTION: ESTABLISHED</span>
          <span>AUTH_KEY: 0x7F4B2...</span>
        </div>
      </motion.div>
    </div>
  );
}
