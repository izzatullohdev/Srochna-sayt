import { Cloudinary } from '@cloudinary/url-gen';

// Cloudinary instance yaratish
// Environment variable'lardan o'qish yoki default qiymatlar
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'your-cloud-name';
const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY || '';
const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET || '';

// Cloudinary instance
export const cld = new Cloudinary({
  cloud: {
    cloudName: cloudName
  }
});

// Cloudinary konfiguratsiya
export const cloudinaryConfig = {
  cloudName,
  apiKey,
  apiSecret
};

// Image transformation uchun default sozlamalar
export const defaultImageTransformation = {
  quality: 'auto',
  format: 'auto',
  fetchFormat: 'auto' as const
};
