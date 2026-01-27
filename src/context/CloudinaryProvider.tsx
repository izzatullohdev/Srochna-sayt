import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { cld } from '../config/cloudinary';
import { getCloudinaryImageUrl, getResponsiveImage, getOptimizedImage } from '../utils/cloudinaryUtils';

interface CloudinaryContextType {
  cld: Cloudinary;
  getImageUrl: typeof getCloudinaryImageUrl;
  getResponsive: typeof getResponsiveImage;
  getOptimized: typeof getOptimizedImage;
  AdvancedImage: typeof AdvancedImage;
}

const CloudinaryContext = createContext<CloudinaryContextType | undefined>(undefined);

interface CloudinaryProviderProps {
  children: ReactNode;
}

export const CloudinaryProvider: React.FC<CloudinaryProviderProps> = ({ children }) => {
  const value: CloudinaryContextType = {
    cld,
    getImageUrl: getCloudinaryImageUrl,
    getResponsive: getResponsiveImage,
    getOptimized: getOptimizedImage,
    AdvancedImage
  };

  return (
    <CloudinaryContext.Provider value={value}>
      {children}
    </CloudinaryContext.Provider>
  );
};

export const useCloudinary = (): CloudinaryContextType => {
  const context = useContext(CloudinaryContext);
  if (!context) {
    throw new Error('useCloudinary must be used within a CloudinaryProvider');
  }
  return context;
};
