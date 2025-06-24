// src/components/voting/CreateProposalForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { MdTitle, MdCloudUpload, MdAccountBalanceWallet,
  MdInfo, MdWarning } from 'react-icons/md';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';

const proposalSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').max(100, 'Title too long'),
  content: z.string().min(200, 'Content must be at least 200 characters').max(10000, 'Content too long'),
  proposalType: z.enum(['continuation', 'branch', 'remix', 'merge']),
  submissionFee: z.number().min(0.01),
  expectedDuration: z.number().min(1).max(30), // days
  additionalNotes: z.string().optional(),
});

type ProposalFormData = z.infer<typeof proposalSchema>;

interface CreateProposalFormProps {

  storyTitle: string;
  currentChapter: number;
  submissionFee: number; // in ETH
  userBalance: number; // in ETH
  onSubmit: (data: ProposalFormData & { attachments?: File[] }) => void;
  loading?: boolean;
}

export const CreateProposalForm: React.FC<CreateProposalFormProps> = ({
  storyTitle,
  currentChapter,
  submissionFee,
  userBalance,
  onSubmit,
  loading = false,
}) => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      proposalType: 'continuation',
      submissionFee: submissionFee,
      expectedDuration: 3,
    },
  });

  const proposalTypes = [
    {
      value: 'continuation',
      label: 'Continuation',
      description: 'Continue the main storyline',
      color: 'primary',
      icon: '📖'
    },
    {
      value: 'branch',
      label: 'Branch',
      description: 'Create an alternate timeline',
      color: 'secondary',
      icon: '🌿'
    },
    {
      value: 'remix',
      label: 'Remix',
      description: 'Reimagine an existing chapter',
      color: 'accent',
      icon: '🔄'
    },
    {
      value: 'merge',
      label: 'Merge',
      description: 'Combine story branches',
      color: 'warning',
      icon: '🔀'
    }
  ];

  const watchedContent = watch('content', '');
  const watchedType = watch('proposalType');
  const wordCount = watchedContent.split(' ').filter(word => word.length > 0).length;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (data: ProposalFormData) => {
    onSubmit({ ...data, attachments });
  };

  const selectedType = proposalTypes.find(type => type.value === watchedType);

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Create Proposal</h1>
            <p className="text-dark-300">
              Submit a new chapter proposal for {storyTitle}
            </p>
          </div>
          <Badge variant="primary" size="lg">
            Chapter {currentChapter + 1}
          </Badge>
        </div>

        {/* Requirements Check */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-dark-800 rounded-lg">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              userBalance >= submissionFee ? 'bg-accent-500/20 text-accent-400' : 'bg-red-500/20 text-red-400'
            }`}>
              <MdAccountBalanceWallet className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white text-sm font-medium">Submission Fee</div>
              <div className="text-dark-400 text-xs">
                {submissionFee} ETH {userBalance >= submissionFee ? '✓' : '✗'}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-dark-800 rounded-lg">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary-500/20 text-primary-400">
              <MdInfo className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white text-sm font-medium">Voting Period</div>
              <div className="text-dark-400 text-xs">3-7 days</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-dark-800 rounded-lg">
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary-500/20 text-secondary-400">
              <MdWarning className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white text-sm font-medium">Min Length</div>
              <div className="text-dark-400 text-xs">200 words</div>
            </div>
          </div>
        </div>
      </Card>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
        {/* Proposal Type */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Proposal Type</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {proposalTypes.map((type) => (
              <motion.label
                key={type.value}
                className={`relative p-4 border rounded-xl cursor-pointer transition-all ${
                  watchedType === type.value
                    ? 'border-primary-500 bg-primary-500/10'
                    : 'border-dark-600 bg-dark-800 hover:border-dark-500'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="radio"
                  value={type.value}
                  className="sr-only"
                  {...register('proposalType')}
                />
                <div className="text-center">
                  <div className="text-2xl mb-2">{type.icon}</div>
                  <div className="text-white font-medium mb-1">{type.label}</div>
                  <div className="text-dark-400 text-sm">{type.description}</div>
                </div>
                {watchedType === type.value && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </motion.label>
            ))}
          </div>

          {selectedType && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-primary-500/5 border border-primary-500/20 rounded-lg"
            >
              <p className="text-primary-300 text-sm">
                <strong>{selectedType.label}:</strong> {selectedType.description}
              </p>
            </motion.div>
          )}
        </Card>

        {/* Basic Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Proposal Details</h2>
          
          <div className="space-y-6">
            {/* Title */}
            <Input
              label="Chapter Title"
              placeholder="Enter a compelling title for your chapter..."
              icon={MdTitle}
              error={errors.title?.message}
              {...register('title')}
            />

            {/* Content */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-dark-200">
                  Chapter Content
                </label>
                <div className="flex items-center space-x-4 text-xs text-dark-400">
                  <span>{wordCount} words</span>
                  <span>~{estimatedReadTime} min read</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    {showPreview ? 'Edit' : 'Preview'}
                  </Button>
                </div>
              </div>

              {showPreview ? (
                <div className="w-full min-h-[300px] p-4 bg-dark-800 border border-dark-600 rounded-xl text-white">
                  <div className="prose prose-invert max-w-none">
                    {watchedContent.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                <textarea
                  placeholder="Write your chapter content here..."
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-dark-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-dark-500 resize-none"
                  rows={15}
                  {...register('content')}
                />
              )}
              
              {errors.content && (
                <p className="mt-2 text-sm text-red-400">{errors.content.message}</p>
              )}
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                placeholder="Add any additional context, inspiration, or notes for voters..."
                className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-dark-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-dark-500 resize-none"
                rows={3}
                {...register('additionalNotes')}
              />
            </div>
          </div>
        </Card>

        {/* Attachments */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Attachments (Optional)</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dark-600 border-dashed rounded-xl cursor-pointer bg-dark-800 hover:bg-dark-700 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <MdCloudUpload className="w-8 h-8 mb-2 text-dark-400" />
                  <p className="mb-1 text-sm text-dark-300">
                    <span className="font-semibold">Click to upload</span> reference images or documents
                  </p>
                  <p className="text-xs text-dark-400">PNG, JPG, PDF (MAX. 10MB each)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {/* Attachment List */}
            {attachments.length > 0 && (
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-dark-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                        <MdCloudUpload className="w-4 h-4 text-primary-400" />
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">{file.name}</div>
                        <div className="text-dark-400 text-xs">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Voting Settings */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Voting Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">
                Voting Duration (Days)
              </label>
              <select
                className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-dark-500"
                {...register('expectedDuration', { valueAsNumber: true })}
              >
                <option value={1}>1 Day (Quick)</option>
                <option value={3}>3 Days (Standard)</option>
                <option value={7}>7 Days (Extended)</option>
                <option value={14}>14 Days (Community)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">
                Submission Fee
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.001"
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-dark-500"
                  {...register('submissionFee', { valueAsNumber: true })}
                  readOnly
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400 text-sm">
                  ETH
                </div>
              </div>
              <p className="text-dark-400 text-xs mt-1">
                Required to prevent spam submissions
              </p>
            </div>
          </div>
        </Card>

        {/* Submit */}
        <div className="flex justify-end space-x-4">
          <Button variant="ghost" size="lg" type="button">
            Save as Draft
          </Button>
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            loading={loading}
            disabled={userBalance < submissionFee}
          >
            Submit Proposal
          </Button>
        </div>

        {/* Fee Warning */}
        {userBalance < submissionFee && (
          <Card className="p-4 bg-red-500/10 border border-red-500/20">
            <div className="flex items-center space-x-3">
              <MdWarning className="w-5 h-5 text-red-400" />
              <div>
                <p className="text-red-400 font-medium">Insufficient Balance</p>
                <p className="text-red-300 text-sm">
                  You need at least {submissionFee} ETH to submit this proposal. 
                  Current balance: {userBalance.toFixed(4)} ETH
                </p>
              </div>
            </div>
          </Card>
        )}
      </form>
    </div>
  );
};