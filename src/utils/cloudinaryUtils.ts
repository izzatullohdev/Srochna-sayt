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
import { 
  auto as autoQualityValue,
  autoBest,
  autoGood,
  autoEco,
  autoLow
} from '@cloudinary/url-gen/qualifiers/quality';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

/**
 * Cloudinary image URL yaratish
 * @param publicId - Cloudinary'dagi rasmning public ID si
 * @param options - Transformation options
 * @returns Cloudinary image URL
 */
export const getCloudinaryImageUrl = (
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'scale' | 'fit' | 'thumb' | 'crop';
    quality?: 'auto' | 'best' | 'good' | 'eco' | 'low' | number;
    format?: 'auto' | 'jpg' | 'png' | 'webp' | 'avif';
    gravity?: 'auto' | 'face' | 'center' | 'north' | 'south' | 'east' | 'west';
    radius?: number;
    effect?: string;
  }
): string => {
  let image = cld.image(publicId);

  // Width va Height sozlash
  if (options?.width || options?.height) {
    const cropMode = options.crop || 'fill';
    
    switch (cropMode) {
      case 'fill':
        const fillResize = fill();
        if (options.width) fillResize.width(options.width);
        if (options.height) fillResize.height(options.height);
        if (options.gravity === 'auto') {
          fillResize.gravity(autoGravity());
        }
        image = image.resize(fillResize);
        break;
      case 'scale':
        const scaleResize = scale();
        if (options.width) scaleResize.width(options.width);
        if (options.height) scaleResize.height(options.height);
        image = image.resize(scaleResize);
        break;
      case 'thumb':
        const thumbResize = thumbnail();
        if (options.width) thumbResize.width(options.width);
        if (options.height) thumbResize.height(options.height);
        if (options.gravity === 'auto') {
          thumbResize.gravity(autoGravity());
        }
        image = image.resize(thumbResize);
        break;
      default:
        const defaultResize = scale();
        if (options.width) defaultResize.width(options.width);
        if (options.height) defaultResize.height(options.height);
        image = image.resize(defaultResize);
    }
  }

  // Quality sozlash
  if (options?.quality) {
    if (options.quality === 'auto') {
      image = image.addAction(new DeliveryQualityAction(autoQualityValue()));
    } else if (typeof options.quality === 'string') {
      const qualityMap: Record<string, any> = {
        best: new DeliveryQualityAction(autoBest()),
        good: new DeliveryQualityAction(autoGood()),
        eco: new DeliveryQualityAction(autoEco()),
        low: new DeliveryQualityAction(autoLow())
      };
      image = image.addAction(qualityMap[options.quality]);
    } else {
      image = image.addAction(new DeliveryQualityAction(options.quality));
    }
  } else {
    image = image.addAction(new DeliveryQualityAction(autoQualityValue()));
  }

  // Format sozlash
  if (options?.format) {
    if (options.format === 'auto') {
      image = image.addAction(new DeliveryFormatAction(undefined, autoFormat()));
    } else {
      const formatMap: Record<string, any> = {
        jpg: new DeliveryFormatAction(undefined, jpeg()),
        png: new DeliveryFormatAction(undefined, png()),
        webp: new DeliveryFormatAction(undefined, webp()),
        avif: new DeliveryFormatAction(undefined, avif())
      };
      image = image.addAction(formatMap[options.format]);
    }
  } else {
    image = image.addAction(new DeliveryFormatAction(undefined, autoFormat()));
  }

  return image.toURL();
};

/**
 * Responsive image URL yaratish
 * @param publicId - Cloudinary'dagi rasmning public ID si
 * @param breakpoints - Responsive breakpoint'lar
 * @returns Object with srcSet va sizes
 */
export const getResponsiveImage = (
  publicId: string,
  breakpoints: { width: number; maxWidth?: number }[]
) => {
  const srcSet = breakpoints
    .map((bp) => {
      const url = getCloudinaryImageUrl(publicId, {
        width: bp.width,
        crop: 'fill',
        quality: 'auto',
        format: 'auto'
      });
      return `${url} ${bp.width}w`;
    })
    .join(', ');

  const sizes = breakpoints
    .map((bp) => {
      if (bp.maxWidth) {
        return `(max-width: ${bp.maxWidth}px) ${bp.width}px`;
      }
      return `${bp.width}px`;
    })
    .join(', ');

  return {
    srcSet,
    sizes,
    src: getCloudinaryImageUrl(publicId, {
      width: breakpoints[breakpoints.length - 1].width,
      quality: 'auto',
      format: 'auto'
    })
  };
};

/**
 * Image optimization uchun helper
 * @param publicId - Cloudinary'dagi rasmning public ID si
 * @param width - Rasm kengligi
 * @param height - Rasm balandligi (optional)
 * @returns Optimized image URL
 */
export const getOptimizedImage = (
  publicId: string,
  width: number,
  height?: number
): string => {
  return getCloudinaryImageUrl(publicId, {
    width,
    height,
    crop: height ? 'fill' : 'scale',
    quality: 'auto',
    format: 'auto'
  });
};
