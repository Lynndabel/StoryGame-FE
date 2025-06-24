// components/SectionWithImage.jsx
import { FC, ReactNode } from "react";
import Image from "next/image";

export interface SectionWithImageProps {
  title: string | ReactNode;
  content: string | ReactNode;
  imageSrc: string;
  imageAlt: string;
  imageOnRight?: boolean;
  showAccentBorder?: boolean;
  accentColor?: string;
  isDark?: boolean;
  className?: string;
}

const SectionWithImage: FC<SectionWithImageProps> = ({
  title,
  content,
  imageSrc,
  imageAlt,
  imageOnRight = true,
  showAccentBorder = false,
  accentColor = "#FFD700",
  isDark = true,
  className = ""
}) => {
  return (
    <section 
      className={`min-h-[60vh] lg:min-h-[70vh] px-8 lg:px-16 py-4 flex items-center ${className}`}
      style={{ backgroundColor: '#333333' }}
    >
      <div className={`max-w-7xl mx-auto grid lg:grid-cols-2 gap-4 lg:gap-8 items-center`}>
        
        {/* Image Section */}
        <div className={`relative ${imageOnRight ? 'lg:order-2' : 'lg:order-1'}`}>
          {showAccentBorder && (
            <div 
              className="absolute -bottom-4 -right-4 w-full h-full rounded-lg z-0"
              style={{ backgroundColor: accentColor }}
            />
          )}
          <div className={`relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden ${showAccentBorder ? 'z-10' : ''}`}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Text Content */}
        <div 
          className={`${imageOnRight ? 'lg:order-1' : 'lg:order-2'} space-y-6 p-8 rounded-lg h-[400px] lg:h-[500px] flex flex-col justify-center border`}
          style={{ backgroundColor: '#33322F', borderColor: '#F2E8CF29' }}
        >
          <h1 className={`text-4xl lg:text-5xl xl:text-6xl font-bold ${isDark ? 'text-[#F9F1E2]' : 'text-gray-900'}`}>
            {title}
          </h1>
          {typeof content === 'string' ? (
            <p className={`text-lg lg:text-xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {content}
            </p>
          ) : (
            <div className={`space-y-4 text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {content}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SectionWithImage;