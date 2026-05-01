"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Upload, FileText, Github, Menu, X } from "lucide-react";
import Image from "next/image";
import { submitApplication, type FormData as ApplicationFormData } from "../../../lib/applicationService";

export default function ApplicationForm() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
    }
  };

  const handleFileSelect = (file: File) => {
    // Check if the file is a PDF
    if (file.type === "application/pdf") {
      setSelectedFile(file);
      setSubmitError(null); 
    } else {
      alert("Please upload a PDF file only");
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileButtonClick = () => {
    // Trigger the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Validate required fields
    if (!selectedFile) {
      setSubmitError("Please upload your resume");
      setIsSubmitting(false);
      return;
    }

    try {
      const applicationData: ApplicationFormData = {
        preferredRole: formData.get('preferred_role') as string,
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        githubProfile: formData.get('github_profile') as string,
        linkedinTwitterProfile: formData.get('linkedin_twitter_profile') as string || undefined,
        resumeFile: selectedFile,
        currentSchool: formData.get('current_school') as string || undefined,
        pitch: formData.get('pitch') as string
      };

      const result = await submitApplication(applicationData);

      if (result.success) {
        setSubmitSuccess(true);
        // Reset form
        form.reset();
        setSelectedFile(null);
      } else {
        setSubmitError(result.error || "Failed to submit application");
      }
    } catch (error) {
      setSubmitError("An unexpected error occurred. Please try again.");
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block fixed left-0 top-0 w-[151px] h-screen z-10">
        <Image src={"/assets/k25/side.svg"} alt='side' fill className="object-cover" />
      </div>
     
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-24 py-3 lg:pl-[171px]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Image src={"/assets/k25/k25.svg"} alt='k25' width={74} height={43} />          
          </div>
          
          {/* Desktop Contact Button */}
          <a href="mailto:biz@keizerworks.com" className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm lg:text-[17px] font-medium">
            Need help?
            <span className="bg-black px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg">
              <Image src={"/assets/k25/k.svg"} alt='k25' width={20} height={28} className="lg:w-6 lg:h-[35px]" /> 
            </span>     
          </a>

          {/* Mobile Menu Button */}
          <button 
            className="sm:hidden p-2"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="sm:hidden mt-4 p-4 bg-white rounded-lg shadow-lg">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium w-full">
              Need help? Contact us
              <span className="bg-black px-2 py-1.5 rounded-lg">
                <Image src={"/assets/k25/k.svg"} alt='k25' width={16} height={24} /> 
              </span>     
            </button>
          </div>
        )}
      </header>

      <div className="max-w-7xl lg:pl-[151px] px-4 sm:px-6 py-8">
        <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-semibold text-gray-900 mb-6 lg:mb-8 px-2 sm:px-6">
          Application
        </h1>

        <div className="h-[1px] w-full bg-gray-300 mb-4 lg:mb-2"></div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Application Submitted Successfully!
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>Thank you for applying! We'll review your application and get back to you soon.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Submission Error
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{submitError}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Job Details Section */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-lg lg:bg-transparent p-4 lg:p-6 space-y-4 lg:space-y-6 shadow-sm lg:shadow-none">
              <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
                Engineering Intern
              </h2>

              <div className="space-y-3 lg:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
                  <p className="text-gray-900">Chandigarh</p>
                </div>

                <div className="border-t border-gray-200"></div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Employment Type</label>
                  <p className="text-gray-900">Intern</p>
                </div>

                <div className="border-t border-gray-200"></div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Location Type</label>
                  <p className="text-gray-900">Hybrid</p>
                </div>

                <div className="border-t border-gray-200"></div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Department</label>
                  <p className="text-gray-900">Engineering</p>
                </div>

                <div className="border-t border-gray-200"></div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Compensation</label>
                  <p className="text-gray-900">50k</p>
                </div>
              </div>
            </div>
          </div>

          {/* Application Form Section */}
          <div className="lg:col-span-3 order-1 lg:order-2 lg:pt-12">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg lg:bg-transparent p-4 lg:p-6 space-y-4 lg:space-y-6 shadow-sm lg:shadow-none">
              
              {/* Preferred Role */}
              <div className="space-y-2">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Preferred Role<span className="text-red-500">*</span>
                </label>
                <select
                  id="role"
                  name="preferred_role"
                  className="w-full px-3 py-3 lg:py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition-colors text-base"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>Select your preferred role</option>
                  <option value="backend">Ui/Ux Designer</option>
                  <option value="frontend">Frontend Engineer</option>
                  <option value="backend">Backend Engineer</option>
                  <option value="backend">Full Stack Engineer</option>
                  <option value="ai-ml">AI/ML Engineer</option>
                </select>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Type here..."
                  className="w-full px-3 py-3 lg:py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition-colors text-base"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="hello@example.com..."
                  className="w-full px-3 py-3 lg:py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition-colors text-base"
                  required
                />
              </div>

              {/* GitHub Profile */}
              <div className="space-y-2">
                <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                  GitHub Profile<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Github className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                  </div>
                  <input
                    id="github"
                    name="github_profile"
                    type="url"
                    placeholder="https://github.com/yourusername"
                    className="w-full pl-9 lg:pl-10 px-3 py-3 lg:py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition-colors text-base"
                    required
                  />
                </div>
              </div>

              {/* LinkedIn/Twitter Profile */}
              <div className="space-y-2">
                <label htmlFor="twitter/linkedin" className="block text-sm font-medium text-gray-700">
                  Linkedin/Twitter Profile
                </label>
                <input
                  id="twitter/linkedin"
                  name="linkedin_twitter_profile"
                  type="url"
                  placeholder="Profile Link"
                  className="w-full px-3 py-3 lg:py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition-colors text-base"
                />
              </div>

              {/* Resume Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Resume (PDF only)<span className="text-red-500">*</span>
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 lg:p-8 text-center transition-colors ${
                    dragActive ? "border-violet-400 bg-violet-50" : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {selectedFile ? (
                    <div className="flex flex-col items-center">
                      <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-violet-500 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-700 break-all px-2">{selectedFile.name}</p>
                      <button 
                        type="button"
                        onClick={() => setSelectedFile(null)}
                        className="mt-2 text-xs text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400 mx-auto mb-3 lg:mb-4" />
                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={handleFileButtonClick}
                          className="px-4 py-3 lg:py-4 text-sm font-medium rounded-md border border-[#6059b2] bg-violet-50 text-[#6059b2] hover:bg-violet-100 transition-colors w-full"
                        >
                          Upload Resume
                        </button>
                        <p className="text-xs text-gray-500 px-2">
                          Drag and drop your resume here, or{" "}
                          <span className="text-[#6059b2] cursor-pointer hover:underline" onClick={handleFileButtonClick}>
                            browse
                          </span>{" "}
                          your files.
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInputChange}
                  className="hidden"
                  aria-label="Resume file upload"
                  id="resume-file-upload"
                />
              </div>

              {/* Current School/University */}
              <div className="space-y-2">
                <label htmlFor="school" className="block text-sm font-medium text-gray-700">
                  Current School/University
                </label>
                <input
                  id="school"
                  name="current_school"
                  type="text"
                  placeholder="Type here..."
                  className="w-full px-3 py-3 lg:py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition-colors text-base"
                />
              </div>

              {/* Pitch */}
              <div className="space-y-2">
                <label htmlFor="pitch" className="block text-sm font-medium text-gray-700">
                  Pitch yourself in 75 words<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="pitch"
                  name="pitch"
                  rows={4}
                  placeholder="Tell us why you're a great fit for this role..."
                  maxLength={450} 
                  className="w-full px-3 py-3 lg:py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 transition-colors resize-none text-base"
                  required
                ></textarea>
                <p className="text-xs text-gray-500">Maximum 75 words</p>
              </div>
              
              {/* Submit Button */}
              <div className="pt-4 lg:pt-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 lg:py-4 px-4 font-bold rounded-full shadow transition-colors text-base ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
                      : 'bg-[#6059b2] hover:bg-violet-700 text-white'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}