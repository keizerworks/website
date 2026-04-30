"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { z } from "zod";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "../ui/button";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(3, "Company is required"),
  project: z
    .string()
    .min(15, "Please provide project description above 15 characters"),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    project: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [formLoadTime] = useState(() => Date.now());
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitStatus, setSubmitStatus] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let statusTimeout: NodeJS.Timeout;
    if (submitStatus) {
      statusTimeout = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }

    return () => {
      if (statusTimeout) clearTimeout(statusTimeout);
    };
  }, [submitStatus]);

  const validateForm = (): boolean => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setSendingEmail(true);
    setErrors({});
    e.preventDefault();
    setSubmitStatus(null);

    if (validateForm()) {
      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            website: honeypot,
            _timestamp: formLoadTime,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setFormData({
            name: "",
            email: "",
            company: "",
            project: "",
          });
          setSubmitStatus({
            message: result.message || "Message sent successfully!",
            type: "success",
          });
        } else {
          setSubmitStatus({
            message: result.error || "Failed to send message",
            type: "error",
          });
        }
      } catch (_error) {
        setSubmitStatus({
          message: "Unable to send message. Please try again.",
          type: "error",
        });
      } finally {
        setSendingEmail(false);
      }
    } else {
      setSendingEmail(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Honeypot field - hidden from users, traps bots */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="mb-6">
        <input
          name="name"
          onChange={handleChange}
          value={formData.name}
          type="text"
          placeholder="Enter your name"
          disabled={sendingEmail}
          className="w-full md:py-[30px] py-[20px] placeholder:text-white/50 bg-transparent border-b border-white text-white placeholder-white focus:outline-none"
        />
        {errors.name && (
          <p className="text-white text-sm flex items-center gap-3 pt-2  mt-1">
            <span className="h-[10px] aspect-square rounded-full bg-red-500 w-[10px] inline-block"></span>
            {errors.name}
          </p>
        )}
      </div>
      <div className="mb-6">
        <input
          name="email"
          onChange={handleChange}
          value={formData.email}
          type="email"
          placeholder="Enter your email"
          disabled={sendingEmail}
          className="w-full md:py-[30px] py-[20px] bg-transparent border-b placeholder:text-white/50 border-white text-white placeholder-white focus:outline-none"
        />
        {errors.email && (
          <p className="text-white text-sm  flex items-center gap-3 pt-2 mt-1">
            <span className="h-[10px] aspect-square rounded-full bg-red-500 w-[10px] inline-block"></span>
            {errors.email}
          </p>
        )}
      </div>
      <div className="mb-6">
        <input
          name="company"
          onChange={handleChange}
          value={formData.company}
          type="text"
          placeholder="Enter your company name"
          disabled={sendingEmail}
          className="w-full md:py-[30px] py-[20px] bg-transparent border-b placeholder:text-white/50 border-white text-white placeholder-white focus:outline-none"
        />
        {errors.company && (
          <p className="text-white text-sm  flex items-center gap-3 pt-2 mt-1">
            <span className="h-[10px] aspect-square rounded-full bg-red-500 w-[10px] inline-block"></span>
            {errors.company}
          </p>
        )}
      </div>
      <div className="mb-6">
        <textarea
          name="project"
          onChange={handleChange}
          value={formData.project}
          placeholder="Enter your project name"
          rows={1}
          disabled={sendingEmail}
          className="w-full md:py-[30px] py-[20px] pr-[20px] bg-transparent border-b placeholder:text-white/50 border-white text-white placeholder-white focus:outline-none"
        />
        {errors.project && (
          <p className="text-white text-sm flex items-center gap-3 pt-2  mt-1">
            <span className="h-[10px] aspect-square rounded-full bg-red-500 w-[10px] inline-block"></span>
            {errors.project}
          </p>
        )}
      </div>
      {submitStatus && (
        <div
          className={`
          mb-6 p-4 rounded 
          ${
            submitStatus.type === "success"
              ? "bg-green-500/30 text-green-500"
              : "bg-red-500/30 text-red-500"
          }
        `}
        >
          {submitStatus.message}
        </div>
      )}

      <button
        type="submit"
        disabled={sendingEmail}
        className="font-sg translate-x-1 font-medium mt-8 group relative text-white px-4 text-lg py-2"
      >
        <div className="absolute -bottom-1 -left-1 w-full h-full bg-white z-0"></div>
        <div className="absolute group-active:translate-y-1 group-active:-translate-x-1 transition-all inset-0 bg-black z-10"></div>
        <div className="flex items-center text-neutral-300">
          <span className="relative inline-block transition-all  duration-300 z-20 group-active:-translate-x-1 group-active:translate-y-1">
            {sendingEmail ? "Sending" : "Send"}
          </span>
          <AnimatePresence mode="wait" initial={false}>
            {sendingEmail ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative z-40 ml-2 
                "
              >
                <span className="relative inline-block transition-all  duration-300 z-20 group-active:-translate-x-1 group-active:translate-y-1">
                  <Loader2 size={20} className="animate-spin" />
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="arrow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative z-40 translate-y-1 ml-2"
              >
                <span className="relative inline-block transition-all  duration-300 z-20 group-active:-translate-x-1 group-active:translate-y-1">
                  <ArrowRight size={20} />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </form>
  );
};

export default ContactForm;
