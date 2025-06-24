// src/components/story/CreateStoryForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { 
  MdCloudUpload,
  MdImage,
  MdDescription,
  MdTitle,
  MdCategory
} from 'react-icons/md';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

const storySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title too long'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description too long'),
  genre: z.string().min(1, 'Please select a genre'),
  tags: z.string().optional(),
  firstChapterTitle: z.string().min(3, 'Chapter title must be at least 3 characters'),
  firstChapterContent: z.string().min(100, 'Chapter content must be at least 100 characters'),
  expectedChapters: z.number().min(1).max(100).optional(),
  isOpenForCollaboration: z.boolean(),
});

type StoryFormData = z.infer<typeof storySchema>;

interface CreateStoryFormProps {
  onSubmit: (data: StoryFormData & { coverImage?: File }) => void;
  loading?: boolean;
}

export const CreateStoryForm: React.FC<CreateStoryFormProps> = ({ onSubmit, loading = false }) => {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<StoryFormData>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      isOpenForCollaboration: true,
    },
  });

  const genres = [
    'Fantasy', 'Science Fiction', 'Mystery', 'Romance', 'Thriller',
    'Horror', 'Adventure', 'Historical Fiction', 'Literary Fiction',
    'Young Adult', 'Comedy', 'Drama', 'Other'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (data: StoryFormData) => {
    onSubmit({ ...data, coverImage: coverImage || undefined });
  };

  const watchedContent = watch('firstChapterContent', '');
  const wordCount = watchedContent.split(' ').filter(word => word.length > 0).length;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Basic Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Story Information</h2>
        
        <div className="space-y-6">
          {/* Title */}
          <Input
            label="Story Title"
            placeholder="Enter an engaging title for your story..."
            icon={MdTitle}
            error={errors.title?.message}
            {...register('title')}
          />

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-dark-200 mb-2">
              Description
            </label>
            <div className="relative">
              <MdDescription className="absolute left-3 top-3 w-5 h-5 text-dark-400" />
              <textarea
                placeholder="Describe your story to attract readers..."
                className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-dark-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-dark-500 resize-none"
                rows={4}
                {...register('description')}
              />
            </div>
            {errors.description && (
              <p className="mt-2 text-sm text-red-400">{errors.description.message}</p>
            )}
          </div>

          {/* Genre & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">
                Genre
              </label>
              <div className="relative">
                <MdCategory className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-400" />
                <select
                  className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-dark-500"
                  {...register('genre')}
                >
                  <option value="">Select a genre</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre.toLowerCase()}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
              {errors.genre && (
                <p className="mt-2 text-sm text-red-400">{errors.genre.message}</p>
              )}
            </div>

            <Input
              label="Tags (optional)"
              placeholder="fantasy, adventure, magic (comma separated)"
              helper="Help readers discover your story"
              {...register('tags')}
            />
          </div>

          {/* Expected Chapters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Expected Chapters (optional)"
              type="number"
              placeholder="10"
              helper="Rough estimate for planning"
              {...register('expectedChapters', { valueAsNumber: true })}
            />

            <div className="flex items-center space-x-3 pt-8">
              <input
                type="checkbox"
                id="collaboration"
                className="w-4 h-4 text-primary-600 bg-dark-800 border-dark-600 rounded focus:ring-primary-500"
                {...register('isOpenForCollaboration')}
              />
              <label htmlFor="collaboration" className="text-sm text-dark-200">
                Open for community collaboration
              </label>
            </div>
          </div>
        </div>
      </Card>

      {/* Cover Image */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Cover Image (Optional)</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dark-600 border-dashed rounded-xl cursor-pointer bg-dark-800 hover:bg-dark-700 transition-colors">
              {coverImagePreview ? (
                <img
                  src={coverImagePreview}
                  alt="Cover preview"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <MdCloudUpload className="w-10 h-10 mb-3 text-dark-400" />
                  <p className="mb-2 text-sm text-dark-300">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-dark-400">PNG, JPG or WEBP (MAX. 5MB)</p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>
      </Card>

      {/* First Chapter */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-white mb-6">First Chapter</h2>
        
        <div className="space-y-6">
          <Input
            label="Chapter Title"
            placeholder="Chapter 1: The Beginning"
            error={errors.firstChapterTitle?.message}
            {...register('firstChapterTitle')}
          />

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-dark-200">
                Chapter Content
              </label>
              <div className="text-xs text-dark-400">
                {wordCount} words • ~{estimatedReadTime} min read
              </div>
            </div>
            <textarea
              placeholder="Once upon a time..."
              className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-dark-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-dark-500 resize-none"
              rows={12}
              {...register('firstChapterContent')}
            />
            {errors.firstChapterContent && (
              <p className="mt-2 text-sm text-red-400">{errors.firstChapterContent.message}</p>
            )}
          </div>
        </div>
      </Card>

      {/* Submit */}
      <div className="flex justify-end space-x-4">
        <Button variant="ghost" size="lg">
          Save as Draft
        </Button>
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          loading={loading}
        >
          Create Story
        </Button>
      </div>
    </form>
  );
};