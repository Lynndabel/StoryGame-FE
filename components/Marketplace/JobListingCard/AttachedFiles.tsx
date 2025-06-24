"use client";
import React from 'react';
import Image from 'next/image';

interface AttachedFile {
  id: string;
  name: string;
  type: 'PDF' | 'IMAGE' | 'DOC' | 'OTHER';
  url: string;
  size?: string;
}

interface AttachedFilesProps {
  files?: string[] | AttachedFile[];
}

const AttachedFiles: React.FC<AttachedFilesProps> = ({ files }) => {
  if (!files || files.length === 0) {
    return (
      <div className="text-[#B5B4AD] text-sm italic">
        No files attached
      </div>
    );
  }

  const getFileType = (fileName: string): 'PDF' | 'IMAGE' | 'DOC' | 'OTHER' => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    if (['pdf'].includes(extension || '')) return 'PDF';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) return 'IMAGE';
    if (['doc', 'docx'].includes(extension || '')) return 'DOC';
    return 'OTHER';
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return (
          <div className="bg-red-500 text-white p-3 rounded text-center w-20 h-20 flex flex-col justify-center">
            <div className="text-sm font-bold">PDF</div>
          </div>
        );
      case 'DOC':
        return (
          <div className="bg-blue-500 text-white p-3 rounded text-center w-20 h-20 flex flex-col justify-center">
            <div className="text-sm font-bold">DOC</div>
          </div>
        );
      case 'IMAGE':
        return null; // Will show actual image
      default:
        return (
          <div className="bg-gray-500 text-white p-3 rounded text-center w-20 h-20 flex flex-col justify-center">
            <div className="text-xs font-bold">FILE</div>
          </div>
        );
    }
  };

  const renderFile = (file: string | AttachedFile, index: number) => {
    let fileData: AttachedFile;
    
    if (typeof file === 'string') {
      // Convert string URL to file object
      const fileName = file.split('/').pop() || `file-${index}`;
      fileData = {
        id: `file-${index}`,
        name: fileName,
        type: getFileType(fileName),
        url: file
      };
    } else {
      fileData = file;
    }
    
    const imageUrl = fileData.url;

    return (
      <div key={`file-${fileData.id}-${index}`} className="flex flex-col items-center gap-2">
        <a
          href={fileData.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-80 transition-opacity"
        >
          {fileData.type === 'IMAGE' ? (
            <div className="w-20 h-20 border border-[#FCFBF726] rounded overflow-hidden">
              <Image
                src={imageUrl}
                alt={fileData.name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
                onError={(e) => {
                  // Handle image load errors by swapping in a simple placeholder
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<div class="w-full h-full bg-gray-600 flex items-center justify-center"><span class="text-white text-xs">IMG</span></div>';
                }}
              />
            </div>
          ) : (
            getFileIcon(fileData.type)
          )}
        </a>
        <span className="text-[#D8D6CF] text-xs text-center max-w-[80px] truncate">
          {fileData.name}
        </span>
        {fileData.size && (
          <span className="text-[#B5B4AD] text-xs">
            {fileData.size}
          </span>
        )}
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