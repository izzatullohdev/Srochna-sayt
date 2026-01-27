# Cloudinary Foydalanish Qo'llanmasi

Bu loyihada Cloudinary rasmlarni optimallashtirish va boshqarish uchun to'liq sozlangan.

## O'rnatish

Paketlar allaqachon o'rnatilgan:
- `@cloudinary/url-gen` - URL yaratish va transformation'lar uchun
- `@cloudinary/react` - React komponentlari uchun

## Konfiguratsiya

### 1. Environment Variables

`.env` faylini yarating va quyidagi ma'lumotlarni kiriting:

```env
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_API_KEY=your-api-key
VITE_CLOUDINARY_API_SECRET=your-api-secret
```

**Eslatma:** `.env` faylini `.gitignore`'ga qo'shing va `.env.example` faylini repository'ga qo'shing.

### 2. Cloudinary Dashboard

1. [Cloudinary](https://cloudinary.com/)'ga ro'yxatdan o'ting
2. Dashboard'dan Cloud Name, API Key va API Secret'ni oling
3. `.env` fayliga qo'ying

## Foydalanish

### Usul 1: CloudinaryImage Komponenti (Tavsiya etiladi)

Eng oson usul - `CloudinaryImage` komponentidan foydalanish:

```tsx
import CloudinaryImage from './components/CloudinaryImage';

// Oddiy foydalanish
<CloudinaryImage 
  publicId="sample" 
  width={400} 
  height={300}
  alt="Sample image"
/>

// Batafsil sozlamalar bilan
<CloudinaryImage 
  publicId="portfolio/image1"
  width={800}
  height={600}
  crop="fill"
  quality="auto"
  format="webp"
  alt="Portfolio image"
  className="my-image"
  loading="lazy"
/>
```

**Props:**
- `publicId` (required) - Cloudinary'dagi rasmning public ID si
- `width` (optional) - Rasm kengligi
- `height` (optional) - Rasm balandligi
- `crop` (optional) - Kesish usuli: 'fill' | 'scale' | 'fit' | 'thumb'
- `quality` (optional) - Sifat: 'auto' | number (1-100)
- `format` (optional) - Format: 'auto' | 'jpg' | 'png' | 'webp' | 'avif'
- `alt` (optional) - Alt text
- `className` (optional) - CSS class
- `loading` (optional) - 'lazy' | 'eager'

### Usul 2: useCloudinary Hook

Context orqali foydalanish:

```tsx
import { useCloudinary } from './context/CloudinaryProvider';

function MyComponent() {
  const { getImageUrl, AdvancedImage, cld } = useCloudinary();
  
  // URL olish
  const imageUrl = getImageUrl('sample', {
    width: 400,
    height: 300,
    crop: 'fill',
    quality: 'auto',
    format: 'webp'
  });
  
  return <img src={imageUrl} alt="Sample" />;
}
```

### Usul 3: Utility Funksiyalar

To'g'ridan-to'g'ri utility funksiyalardan foydalanish:

```tsx
import { getCloudinaryImageUrl, getOptimizedImage, getResponsiveImage } from './utils/cloudinaryUtils';

// Oddiy URL
const url = getCloudinaryImageUrl('sample', {
  width: 400,
  height: 300,
  quality: 'auto',
  format: 'webp'
});

// Optimized image
const optimizedUrl = getOptimizedImage('sample', 400, 300);

// Responsive image
const responsive = getResponsiveImage('sample', [
  { width: 320, maxWidth: 640 },
  { width: 640, maxWidth: 1024 },
  { width: 1024 }
]);

// HTML'da
<img 
  src={responsive.src}
  srcSet={responsive.srcSet}
  sizes={responsive.sizes}
  alt="Responsive image"
/>
```

### Usul 4: AdvancedImage Komponenti

To'g'ridan-to'g'ri `@cloudinary/react` komponentidan foydalanish:

```tsx
import { AdvancedImage } from '@cloudinary/react';
import { cld } from './config/cloudinary';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/actions';
import { format, quality } from '@cloudinary/url-gen/actions';
import { auto as autoFormat } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';

function MyComponent() {
  const myImage = cld.image('sample');
  myImage
    .resize(fill().width(400).height(300).gravity(autoGravity()))
    .format(autoFormat())
    .quality(autoQuality());
  
  return <AdvancedImage cldImg={myImage} alt="Sample" />;
}
```

## Misollar

### Header komponentida foydalanish

```tsx
import CloudinaryImage from './components/CloudinaryImage';

// Eski usul (local image)
// <img src={bgImage} alt="Background" />

// Yangi usul (Cloudinary)
<CloudinaryImage 
  publicId="backgrounds/hero-bg"
  width={1920}
  height={1080}
  crop="fill"
  quality="auto"
  format="webp"
  alt="Hero background"
  className="hero-background"
/>
```

### Students komponentida foydalanish

```tsx
import CloudinaryImage from './components/CloudinaryImage';

const testimonials = [
  {
    id: 1,
    name: 'Boborajabova Nozanin',
    publicId: 'students/student1', // Cloudinary'dagi public ID
  },
  // ...
];

// Render qilish
{testimonials.map((testimonial) => (
  <CloudinaryImage
    key={testimonial.id}
    publicId={testimonial.publicId}
    width={400}
    height={500}
    crop="fill"
    quality="auto"
    format="webp"
    alt={testimonial.name}
    className="thumbnail-image"
  />
))}
```

### Responsive images

```tsx
import { getResponsiveImage } from './utils/cloudinaryUtils';

const responsive = getResponsiveImage('hero-image', [
  { width: 320, maxWidth: 640 },
  { width: 640, maxWidth: 1024 },
  { width: 1024, maxWidth: 1280 },
  { width: 1920 }
]);

<img 
  src={responsive.src}
  srcSet={responsive.srcSet}
  sizes={responsive.sizes}
  alt="Responsive hero"
/>
```

## Transformation'lar

### Crop modes
- `fill` - Rasmni to'ldirish (width va height kerak)
- `scale` - Proporsional o'lchash
- `fit` - Rasmni sig'dirish
- `thumb` - Thumbnail yaratish

### Quality levels
- `auto` - Avtomatik optimallashtirish (tavsiya etiladi)
- `best` - Eng yaxshi sifat
- `good` - Yaxshi sifat
- `eco` - Ekonomik (kichik fayl hajmi)
- `low` - Past sifat
- `number` (1-100) - Aniq qiymat

### Formats
- `auto` - Browser'ga mos format (tavsiya etiladi)
- `webp` - Zamonaviy format
- `avif` - Eng yangi format
- `jpg` / `jpeg` - Standart format
- `png` - Transparent fon uchun

## Fayl Strukturasi

```
src/
├── config/
│   └── cloudinary.ts          # Cloudinary konfiguratsiyasi
├── context/
│   └── CloudinaryProvider.tsx # Cloudinary Context va Provider
├── utils/
│   └── cloudinaryUtils.ts     # Utility funksiyalar
└── components/
    └── CloudinaryImage.tsx    # CloudinaryImage komponenti
```

## Qo'shimcha Ma'lumot

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Cloudinary React SDK](https://cloudinary.com/documentation/react_integration)
- [Cloudinary URL Generation](https://cloudinary.com/documentation/url_generation)

## Eslatmalar

1. **Public ID:** Cloudinary'ga yuklangan rasmlar `public_id` ga ega bo'ladi. Bu ID'ni komponentlarda ishlatish kerak.

2. **Environment Variables:** `.env` faylini `.gitignore`'ga qo'shing va production'da environment variables'ni to'g'ri sozlang.

3. **Image Upload:** Rasmlarni Cloudinary'ga yuklash uchun:
   - Dashboard orqali
   - Upload API orqali
   - Media Library orqali

4. **Performance:** `quality: 'auto'` va `format: 'auto'` ishlatish browser'ga mos format va sifatni tanlashga yordam beradi.
