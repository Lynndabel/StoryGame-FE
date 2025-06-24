// RaiseDisputeModal.tsx - Refactored to use the imported Modal component
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaFilePdf, FaCheck } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';
import Modal from '../Modal'; // Import your reusable Modal component
import DisputeConfirmation from './DisputeConfirmationModal'

// Add this to your global CSS or layout file:
// @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');

interface UploadedFile {
  id: string;
  name: string;
  type: 'image' | 'pdf';
  url: string;
  file: File;
}

interface FormData {
  disputeTypes: string[];
  customDisputeType: string;
  description: string;
  files: UploadedFile[];
}

interface RaiseDisputeModalProps {
isOpen: boolean;
  onClose: () => void;
}

const RaiseDisputeModal: React.FC<RaiseDisputeModalProps> = ({ isOpen, onClose }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    disputeTypes: [],
    customDisputeType: '',
    description: '',
    files: []
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const maxFiles = 5;
  const maxDescriptionLength = 150;

  const disputeTypeOptions = [
    'Quality of Work',
    'Payment Issue',
    'Deadline Not Met',
    'Communication Problem',
    'Others'
  ];

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = [];

    Array.from(files).forEach((file) => {
      if (formData.files.length + newFiles.length >= maxFiles) return;

      const fileType = file.type.startsWith('image/') ? 'image' : 'pdf';
      const url = URL.createObjectURL(file);

      newFiles.push({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: fileType,
        url,
        file
      });
    });

    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...newFiles]
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(event.target.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const removeFile = (fileId: string) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter(file => {
        if (file.id === fileId) {
          URL.revokeObjectURL(file.url);
          return false;
        }
        return true;
      })
    }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxDescriptionLength) {
      setFormData(prev => ({
        ...prev,
        description: text
      }));
    }
  };

  const handleDisputeTypeToggle = (type: string) => {
    setFormData(prev => ({
      ...prev,
      disputeTypes: prev.disputeTypes.includes(type)
        ? prev.disputeTypes.filter(t => t !== type)
        : [...prev.disputeTypes, type]
    }));
  };

  const handleSubmit = async () => {
    // Close current modal and show confirmation modal
    onClose();
    setShowConfirmation(true);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  const remainingFiles = maxFiles - formData.files.length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen && !showConfirmation) return null;

  return (
    <>
      {/* Main Dispute Modal */}
      {isOpen && (
        <Modal closeFn={onClose}>
          <div className="bg-[#F2E8CF0A] rounded-lg w-[90vw] max-w-3xl max-h-[90vh] overflow-hidden transition-all duration-300 flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4 bg-[#F2E8CF0A]">
              <div>
                <h2 className="text-[#FCFBF7] text-[32px] font-bold leading-[120%] tracking-[0.03em]" style={{ fontFamily: 'Merriweather' }}>
                  <span className="relative inline-block">
                    Raise
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FFD700]"></div>
                  </span>
                  {' '}Dispute
                </h2>
              </div>
            </div>

            {/* Body - Scrollable content */}
            <div className="px-6 pb-2 flex-grow bg-[#333333] overflow-y-auto max-h-[60vh]">
              <p className="text-[#F9F1E2] text-[16px] font-normal leading-[156%] tracking-normal mb-6" style={{ fontFamily: 'Merriweather' }}>
                Tell us a little more about yourself to help clients get to know you better. You&apos;re just a few steps away from showcasing your skills!
              </p>

              {/* Two Column Layout */}
              <div className="flex gap-8">
                {/* Left Column */}
                <div className="flex-1">
                  {/* Dispute Type */}
                  <div className="mb-6">
                    <h3 className="text-white text-sm font-normal mb-3">Dispute Type</h3>
                    <div ref={dropdownRef}>
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-[#F2E8CF29] text-gray-400 p-3 rounded border border-gray-600 focus:border-gray-500 focus:outline-none flex justify-between items-center text-sm"
                      >
                        <span>
                          {formData.disputeTypes.length > 0 
                            ? `${formData.disputeTypes.length} selected` 
                            : 'Select Dispute Type'}
                        </span>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {isDropdownOpen && (
                        <div className="w-full bg-[#2A2A2A] border border-gray-600 rounded-b mt-[-1px] max-h-64 overflow-y-auto relative z-10">
                          {disputeTypeOptions.map((type) => (
                            <label
                              key={type}
                              className="flex items-center p-3 hover:bg-[#333333] cursor-pointer text-sm"
                            >
                              <div className="mr-3 w-4 h-4 relative">
                                <input
                                  type="checkbox"
                                  value={type}
                                  checked={formData.disputeTypes.includes(type)}
                                  onChange={() => handleDisputeTypeToggle(type)}
                                  className="sr-only"
                                />
                                <div className={`w-4 h-4 rounded-full border ${formData.disputeTypes.includes(type) ? 'border-green-500 bg-green-500' : 'border-gray-500'}`}>
                                  {formData.disputeTypes.includes(type) && (
                                    <FaCheck className="text-white text-xs absolute top-0.5 left-0.5" />
                                  )}
                                </div>
                              </div>
                              <span className="text-gray-300">{type}</span>
                            </label>
                          ))}
                          
                          {/* Custom dispute type input */}
                          <div className="p-3 border-t border-gray-700">
                            <p className="text-gray-400 text-xs mb-2">Couldn&apos;t find your preferred dispute type?</p>
                            <input
                              type="text"
                              placeholder="Enter dispute type here"
                              value={formData.customDisputeType}
                              onChange={(e) => setFormData(prev => ({ ...prev, customDisputeType: e.target.value }))}
                              className="w-full bg-[#F2E8CF29] text-gray-300 p-2 rounded border border-gray-700 focus:border-gray-500 focus:outline-none text-sm"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-white text-sm font-normal mb-2">
                      Detailed Description <span className="text-red-500">*</span>
                    </h3>
                    <div className="relative">
                      <textarea
                        value={formData.description}
                        onChange={handleDescriptionChange}
                        placeholder="Text area for user to explain the problem clearly."
                        className="w-full h-24 bg-[#F2E8CF29] text-gray-300 p-3 rounded border border-gray-600 focus:border-gray-500 focus:outline-none placeholder-gray-500 text-sm resize-none"
                      />
                      <div className="absolute bottom-2 right-3 text-xs text-gray-500">
                        {formData.description.length}/{maxDescriptionLength}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Upload Evidence */}
                <div className="flex-1">
                  <h3 className="text-white text-sm font-normal mb-3">Upload Evidence</h3>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                  
                  {formData.files.length === 0 ? (
                    // Empty upload state
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed ${isDragging ? 'border-[#FFD700] bg-[#333333]' : 'border-gray-600'} rounded-lg p-8 text-center transition-colors`}
                    >
                      <Image 
                        src="/market/upload.svg" 
                        alt="Upload" 
                        width={48} 
                        height={48} 
                        className="mx-auto mb-3"
                      />
                      <p className="text-gray-400 text-sm mb-2">
                        Drag and drop Image here or{' '}
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="text-[#FFD700] hover:text-[#e6c200] underline"
                        >
                          UPLOAD
                        </button>
                      </p>
                    </div>
                  ) : (
                    // Files uploaded state
                    <div>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        {/* PDF Files */}
                        {formData.files.filter(f => f.type === 'pdf').map((file) => (
                          <div key={file.id} className="relative group">
                            <div className="bg-red-500 rounded-lg p-4 aspect-square flex flex-col items-center justify-center">
                              <FaFilePdf className="text-white text-3xl mb-1" />
                              <span className="text-white text-xs font-medium">PDF</span>
                              <span className="text-white text-[10px] mt-1 truncate w-full text-center px-1">
                                {file.name.replace('.pdf', '').substring(0, 15)}
                              </span>
                            </div>
                            <button
                              onClick={() => removeFile(file.id)}
                              className="absolute -top-2 -right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <IoClose size={16} className="text-gray-700" />
                            </button>
                          </div>
                        ))}
                        
                        {/* Image Files */}
                        {formData.files.filter(f => f.type === 'image').map((file) => (
                          <div key={file.id} className="relative group">
                            <div className="rounded-lg overflow-hidden aspect-square bg-gray-700">
                              <Image
                                src={file.url}
                                alt={file.name}
                                fill
                                className="w-full h-full object-cover"
                                style={{ objectFit: 'cover' }}
                              />
                            </div>
                            <button
                              onClick={() => removeFile(file.id)}
                              className="absolute -top-2 -right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <IoClose size={16} className="text-gray-700" />
                            </button>
                          </div>
                        ))}
                        
                        {/* Add Another button */}
                        {formData.files.length < maxFiles && (
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-gray-600 rounded-lg aspect-square flex flex-col items-center justify-center hover:border-[#FFD700] transition-colors"
                          >
                            <span className="text-3xl text-gray-500 mb-1">+</span>
                            <span className="text-gray-500 text-xs">Add Another</span>
                          </button>
                        )}
                      </div>
                      
                      <p className="text-gray-500 text-xs text-right">
                        {maxFiles} Files Max ({remainingFiles} left)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 pt-4 flex justify-between bg-[#333333]">
              <button
                onClick={onClose}
                className="bg-[#262208] hover:bg-[#1a1706] text-white font-medium py-2.5 px-8 rounded text-sm"
              >
                BACK
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.description.trim()}
                className="bg-[#FFD700] hover:bg-[#e6c200] text-black font-medium py-2.5 px-8 rounded disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                SUBMIT DISPUTE
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <DisputeConfirmation
          onCancel={handleConfirmationClose}
        />
      )}
    </>
  );
};

export default RaiseDisputeModal;