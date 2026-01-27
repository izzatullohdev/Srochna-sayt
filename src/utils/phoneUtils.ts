/**
 * Telefon raqami formatlash va davlatlar ro'yxati
 */

export interface Country {
  code: string;
  name: string;
  flag: string;
  phoneCode: string;
  format: string; // Format pattern, masalan: "+998 (__) ___ __ __"
  placeholder: string;
}

export const countries: Country[] = [
  {
    code: 'UZ',
    name: "O'zbekiston",
    flag: '🇺🇿',
    phoneCode: '+998',
    format: '+998 (__) ___ __ __',
    placeholder: '+998 (__) ___ __ __'
  },
  {
    code: 'RU',
    name: 'Rossiya',
    flag: '🇷🇺',
    phoneCode: '+7',
    format: '+7 (___) ___ __ __',
    placeholder: '+7 (___) ___ __ __'
  },
  {
    code: 'KZ',
    name: 'Qozog\'iston',
    flag: '🇰🇿',
    phoneCode: '+7',
    format: '+7 (___) ___ __ __',
    placeholder: '+7 (___) ___ __ __'
  },
  {
    code: 'TJ',
    name: 'Tojikiston',
    flag: '🇹🇯',
    phoneCode: '+992',
    format: '+992 (__) ___ __ __',
    placeholder: '+992 (__) ___ __ __'
  },
  {
    code: 'KG',
    name: 'Qirg\'iziston',
    flag: '🇰🇬',
    phoneCode: '+996',
    format: '+996 (___) ___ __ __',
    placeholder: '+996 (___) ___ __ __'
  },
  {
    code: 'TM',
    name: 'Turkmaniston',
    flag: '🇹🇲',
    phoneCode: '+993',
    format: '+993 (__) ___ __ __',
    placeholder: '+993 (__) ___ __ __'
  },
  {
    code: 'AF',
    name: 'Afg\'oniston',
    flag: '🇦🇫',
    phoneCode: '+93',
    format: '+93 (___) ___ __ __',
    placeholder: '+93 (___) ___ __ __'
  },
  {
    code: 'US',
    name: 'AQSH',
    flag: '🇺🇸',
    phoneCode: '+1',
    format: '+1 (___) ___ ____',
    placeholder: '+1 (___) ___ ____'
  },
  {
    code: 'GB',
    name: 'Buyuk Britaniya',
    flag: '🇬🇧',
    phoneCode: '+44',
    format: '+44 (___) ____ ____',
    placeholder: '+44 (___) ____ ____'
  },
  {
    code: 'DE',
    name: 'Germaniya',
    flag: '🇩🇪',
    phoneCode: '+49',
    format: '+49 (___) _______',
    placeholder: '+49 (___) _______'
  },
  {
    code: 'TR',
    name: 'Turkiya',
    flag: '🇹🇷',
    phoneCode: '+90',
    format: '+90 (___) ___ __ __',
    placeholder: '+90 (___) ___ __ __'
  },
  {
    code: 'CN',
    name: 'Xitoy',
    flag: '🇨🇳',
    phoneCode: '+86',
    format: '+86 (___) ____ ____',
    placeholder: '+86 (___) ____ ____'
  },
];

/**
 * Telefon raqamini formatlash
 * @param phone - Telefon raqami (faqat raqamlar)
 * @param country - Davlat
 * @returns Formatlangan telefon raqami
 */
export const formatPhoneNumber = (phone: string, country: Country): string => {
  // Faqat raqamlarni qoldirish
  let digits = phone.replace(/\D/g, '');
  
  // Davlat kodini olib tashlash (agar bor bo'lsa)
  const phoneCode = country.phoneCode.replace(/\D/g, '');
  
  // Agar davlat kodi bilan boshlansa, uni olib tashlash
  if (digits.startsWith(phoneCode)) {
    digits = digits.substring(phoneCode.length);
  }
  
  // Formatlash
  let formatted = country.phoneCode;
  
  if (country.code === 'UZ') {
    // O'zbekiston: +998 (XX) XXX XX XX
    if (digits.length > 0) {
      formatted += ' (';
      formatted += digits.substring(0, 2);
      if (digits.length > 2) {
        formatted += ') ' + digits.substring(2, 5);
        if (digits.length > 5) {
          formatted += ' ' + digits.substring(5, 7);
          if (digits.length > 7) {
            formatted += ' ' + digits.substring(7, 9);
          }
        }
      } else {
        formatted += ')';
      }
    }
  } else if (country.code === 'RU' || country.code === 'KZ') {
    // Rossiya/Qozog'iston: +7 (XXX) XXX XX XX
    if (digits.length > 0) {
      formatted += ' (';
      formatted += digits.substring(0, 3);
      if (digits.length > 3) {
        formatted += ') ' + digits.substring(3, 6);
        if (digits.length > 6) {
          formatted += ' ' + digits.substring(6, 8);
          if (digits.length > 8) {
            formatted += ' ' + digits.substring(8, 10);
          }
        }
      } else {
        formatted += ')';
      }
    }
  } else {
    // Boshqa davlatlar uchun oddiy formatlash
    if (digits.length > 0) {
      formatted += ' ' + digits;
    }
  }
  
  return formatted;
};

/**
 * Telefon raqamini tozalash (faqat raqamlar va +)
 * @param phone - Telefon raqami
 * @param country - Davlat
 * @returns Tozalangan telefon raqami
 */
export const cleanPhoneNumber = (phone: string, country: Country): string => {
  // Faqat raqamlarni qoldirish
  const digits = phone.replace(/\D/g, '');
  
  // Davlat kodini qo'shish
  const phoneCode = country.phoneCode.replace(/\D/g, '');
  
  // Agar davlat kodi yo'q bo'lsa, qo'shish
  if (!digits.startsWith(phoneCode)) {
    return country.phoneCode + digits;
  }
  
  return country.phoneCode + digits;
};

/**
 * Telefon raqamini tekshirish
 * @param phone - Telefon raqami
 * @param country - Davlat
 * @returns To'g'ri yoki noto'g'ri
 */
export const validatePhoneNumber = (phone: string, country: Country): boolean => {
  const digits = phone.replace(/\D/g, '');
  const phoneCode = country.phoneCode.replace(/\D/g, '');
  
  if (!digits.startsWith(phoneCode)) {
    return false;
  }
  
  const number = digits.substring(phoneCode.length);
  
  // Minimal raqamlar soni
  if (country.code === 'UZ') {
    return number.length === 9; // 9 raqam
  } else if (country.code === 'RU' || country.code === 'KZ') {
    return number.length === 10; // 10 raqam
  }
  
  return number.length >= 7; // Minimal 7 raqam
};
