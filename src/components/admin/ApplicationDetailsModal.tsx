'use client'

import { Download, Mail, Github, ExternalLink, User, Calendar, School, FileText } from 'lucide-react'
import type { Application } from '~/lib/supabase'
import { getResumeUrl } from '~/lib/applicationService'
import Modal from '~/components/ui/modal'

interface ApplicationDetailsModalProps {
  application: Application | null
  isOpen: boolean
  onClose: () => void
}

export default function ApplicationDetailsModal({ application, isOpen, onClose }: ApplicationDetailsModalProps) {
  if (!application) return null

  const handleDownloadResume = async () => {
    try {
      const url = await getResumeUrl(application.resume_file_path)
      const link = document.createElement('a')
      link.href = url
      link.download = `${application.name}-resume.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading resume:', error)
    }
  }

  const handleViewResume = async () => {
    try {
      const url = await getResumeUrl(application.resume_file_path)
      window.open(url, '_blank')
    } catch (error) {
      console.error('Error viewing resume:', error)
    }
  }

  const openEmailInBrowser = (type: 'gmail' | 'outlook') => {
    const subject = encodeURIComponent("We regret to inform you that you were not selected for the K25 batch of Keizerworks")
    const body = encodeURIComponent(`Dear ${application.name},

We reviewed your application for the applied position, but considering it with the other applications we received, we had to opt for the best we got.

For Keizer, we are looking for a specific number of dedicated individuals who are willing to put in high efforts and understand the concept of Keizer.
People who can work together with the best team in India to make Keizer great. Unfortunately, you didn't meet our requirements, hence you didn't get selected.

You can apply later for further opportunities at Keizerworks!
Till then, see you.

Best wishes,
Yukti M.
COO | Keizerworks.`)

    const mailtoUrl = type === 'gmail' 
      ? `https://mail.google.com/mail/?view=cm&fs=1&to=${application.email}&su=${subject}&body=${body}`
      : `https://outlook.live.com/mail/0/deeplink/compose?to=${application.email}&subject=${subject}&body=${body}`

    window.open(mailtoUrl, '_blank')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Application Details"
      size="xl"
    >
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-start space-x-4">
          <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xl font-medium text-gray-600">
              {application.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{application.name}</h2>
            <p className="text-gray-600">{application.email}</p>
            <div className="mt-2 flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {application.preferred_role}
              </span>
              {application.created_at && (
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(application.created_at)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Personal Information
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="text-sm text-gray-900">{application.email}</p>
              </div>
              
              {application.current_school && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current School</label>
                  <div className="flex items-center space-x-2">
                    <School className="h-4 w-4 text-gray-500" />
                    <p className="text-sm text-gray-900">{application.current_school}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Links & Actions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <ExternalLink className="h-5 w-5 mr-2" />
              Links & Actions
            </h3>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              {/* GitHub Profile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Profile</label>
                <a
                  href={application.github_profile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
                >
                  <Github className="h-4 w-4 mr-2" />
                  View GitHub
                  <ExternalLink className="h-3 w-3 ml-2" />
                </a>
              </div>

              {/* LinkedIn/Twitter */}
              {application.linkedin_twitter_profile && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Social Profile</label>
                  <a
                    href={application.linkedin_twitter_profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Profile
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </a>
                </div>
              )}

              {/* Resume Actions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>
                <div className="flex space-x-2">
                  <button
                    onClick={handleViewResume}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View
                  </button>
                  <button
                    onClick={handleDownloadResume}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>

              {/* Contact Action */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                <a
                  href={`mailto:${application.email}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Pitch Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Application Pitch</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
              {application.pitch || 'No pitch provided.'}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => openEmailInBrowser('gmail')}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors flex items-center"
          >
            <Mail className="h-4 w-4 mr-2" />
            Send with Gmail
          </button>
          <button
            onClick={() => openEmailInBrowser('outlook')}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <Mail className="h-4 w-4 mr-2" />
            Send with Outlook
          </button>
        </div>
      </div>
    </Modal>
  )
} 