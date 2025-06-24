// AttachedFiles.tsx
import React from 'react';
import Image from 'next/image';

export interface File {
  type: string;
  url: string;
  _id: string;
}

interface AttachedFilesProps {
  files?: (File | string)[];  // Accept both File objects and string URLs
}

const AttachedFiles: React.FC<AttachedFilesProps> = ({ files }) => {
  if (!files || files.length === 0) {
    return null;
  }

  const renderFile = (file: File | string, index: number) => {
    // If file is a string (URL), create a simple file object
    const fileData: File = typeof file === 'string' 
      ? { type: 'IMAGE', url: file, _id: `file-${index}` }
      : file;

    return (
      <div 
        key={fileData._id}
        className="relative w-24 h-24 border border-[#FCFBF726] rounded-lg overflow-hidden"
      >
        {fileData.type === 'IMAGE' && fileData.url ? (
          <Image
            src={fileData.url}
            alt="Attached file"
            fill
            className="object-cover"
            sizes="(max-width: 96px) 100vw, 96px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#26220826] text-[#D8D6CF]">
            <span className="text-sm">File</span>
          </div>
        )}
        <a
          href={fileData.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 hover:bg-black/20 transition-colors"
          aria-label="View file"
        />
      </div>
    );
  };

  return (
    <div className="flex flex-wrap gap-4">
      {files.map((file, index) => renderFile(file, index))}
    </div>
  );
};

export default AttachedFiles;