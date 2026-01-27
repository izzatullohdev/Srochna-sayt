import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { cld } from '../config/cloudinary';
import { fill, scale, thumbnail } from '@cloudinary/url-gen/actions/resize';
import { DeliveryFormatAction } from '@cloudinary/url-gen/actions/delivery/DeliveryFormatAction';
import { DeliveryQualityAction } from '@cloudinary/url-gen/actions/delivery/DeliveryQualityAction';
import { 
  auto as autoFormat,
  jpeg,
  png,
  webp,
  avif
} from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQualityValue } from '@cloudinary/url-gen/qualifiers/quality';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

interface CloudinaryImageProps {
  publicId: string;
  width?: number;
  height?: number;
  crop?: 'fill' | 'scale' | 'fit' | 'thumb';
  quality?: 'auto' | number;
  format?: 'auto' | 'jpg' | 'png' | 'webp' | 'avif';
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  onClick?: () => void;
}

/**
 * CloudinaryImage komponenti - Cloudinary rasmlarini ko'rsatish uchun
 * 
 * @example
 * <CloudinaryImage 
 *   publicId="sample" 
 *   width={400} 
 *   height={300}
 *   alt="Sample image"
 * />
 */
export const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  publicId,
  width,
  height,
  crop = 'fill',
  quality: qualityProp = 'auto',
  format: formatProp = 'auto',
  alt = '',
  className = '',
  style,
  loading = 'lazy',
  onClick
}) => {
  const image = cld.image(publicId);

  // Width va Height sozlash
  if (width || height) {
    switch (crop) {
      case 'fill':
        const fillResize = fill();
        if (width) fillResize.width(width);
        if (height) fillResize.height(height);
        fillResize.gravity(autoGravity());
        image.resize(fillResize);
        break;
      case 'scale':
        const scaleResize = scale();
        if (width) scaleResize.width(width);
        if (height) scaleResize.height(height);
        image.resize(scaleResize);
        break;
      case 'thumb':
        const thumbResize = thumbnail();
        if (width) thumbResize.width(width);
        if (height) thumbResize.height(height);
        thumbResize.gravity(autoGravity());
        image.resize(thumbResize);
        break;
      default:
        const defaultResize = scale();
        if (width) defaultResize.width(width);
        if (height) defaultResize.height(height);
        image.resize(defaultResize);
    }
  }

  // Quality sozlash
  if (qualityProp === 'auto') {
    image.addAction(new DeliveryQualityAction(autoQualityValue()));
  } else {
    image.addAction(new DeliveryQualityAction(qualityProp));
  }

  // Format sozlash
  if (formatProp === 'auto') {
    image.addAction(new DeliveryFormatAction(undefined, autoFormat()));
  } else {
    const formatMap: Record<string, any> = {
      jpg: new DeliveryFormatAction(undefined, jpeg()),
      png: new DeliveryFormatAction(undefined, png()),
      webp: new DeliveryFormatAction(undefined, webp()),
      avif: new DeliveryFormatAction(undefined, avif())
    };
    image.addAction(formatMap[formatProp]);
  }

  return (
    <AdvancedImage
      cldImg={image}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      onClick={onClick}
    />
  );
};

export default CloudinaryImage;
