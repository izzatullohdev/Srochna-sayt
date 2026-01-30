/**
 * Bitrix24 CRM API utility funksiyalari
 */

interface Bitrix24ContactData {
  NAME?: string;
  LAST_NAME?: string;
  PHONE?: Array<{ VALUE: string; VALUE_TYPE: string }>;
  EMAIL?: Array<{ VALUE: string; VALUE_TYPE: string }>;
  COMMENTS?: string;
  ADDRESS?: string;
  SOURCE_ID?: string;
  // Custom fields
  UF_CRM_1769674454?: string; // Ota-onasi telefon raqami (chislo)
  UF_CRM_1769674491?: string; // Yashash hududi (adres)
  UF_CRM_1769674557?: string; // Ingliz tili darajasi (Stroka)
  UF_CRM_1769750196?: string; // Sertifikat (spisok "bor/yoq")
  CATEGORY_ID?: number; // Category ID
}

interface Bitrix24Response {
  result?: number; // Contact ID
  error?: string;
  error_description?: string;
}

interface Bitrix24DealData {
  TITLE: string;
  CONTACT_ID: number;
  COMMENTS?: string;
  SOURCE_ID?: string;
  CATEGORY_ID?: number;
  UF_CRM_1769674454?: string;
  UF_CRM_1769674491?: string;
  UF_CRM_1769674557?: string;
  UF_CRM_1769750196?: string;
}

interface Bitrix24ErrorResponse {
  error?: string;
  error_description?: string;
  error_message?: string;
  [key: string]: unknown;
}

/**
 * Bitrix24'ga contact qo'shish
 * @param contactData - Contact ma'lumotlari
 * @returns Promise<Bitrix24Response>
 */
export const addContactToBitrix24 = async (
  contactData: Bitrix24ContactData
): Promise<Bitrix24Response> => {
  // To'g'ridan-to'g'ri webhook URL
  const webhookUrl = 'https://crm.usatportal.uz/rest/462/k9qpswrdpg6qtefp/crm.contact.add.json';

  try {
    interface Bitrix24RequestFields {
      NAME: string;
      LAST_NAME: string;
      PHONE: Array<{ VALUE: string; VALUE_TYPE: string }>;
      SOURCE_ID: string;
      UF_CRM_1769674454?: string;
      UF_CRM_1769674491?: string;
      UF_CRM_1769674557?: string;
      UF_CRM_1769750196?: string;
      CATEGORY_ID?: number;
      EMAIL?: Array<{ VALUE: string; VALUE_TYPE: string }>;
      COMMENTS?: string;
      ADDRESS?: string;
    }

    const fields: Bitrix24RequestFields = {
      NAME: contactData.NAME || '',
      LAST_NAME: contactData.LAST_NAME || '',
      PHONE: contactData.PHONE || [],
      SOURCE_ID: contactData.SOURCE_ID || 'WEB',
    };

    if (contactData.EMAIL && contactData.EMAIL.length > 0) {
      fields.EMAIL = contactData.EMAIL;
    }
    if (contactData.COMMENTS) {
      fields.COMMENTS = contactData.COMMENTS;
    }
    if (contactData.ADDRESS) {
      fields.ADDRESS = contactData.ADDRESS;
    }

    // Custom fields qo'shish
    if (contactData.UF_CRM_1769674454 !== undefined) {
      fields.UF_CRM_1769674454 = contactData.UF_CRM_1769674454;
    }
    if (contactData.UF_CRM_1769674491 !== undefined) {
      fields.UF_CRM_1769674491 = contactData.UF_CRM_1769674491;
    }
    if (contactData.UF_CRM_1769674557 !== undefined) {
      fields.UF_CRM_1769674557 = contactData.UF_CRM_1769674557;
    }
    if (contactData.UF_CRM_1769750196 !== undefined) {
      fields.UF_CRM_1769750196 = contactData.UF_CRM_1769750196;
    }
    if (contactData.CATEGORY_ID !== undefined) {
      fields.CATEGORY_ID = contactData.CATEGORY_ID;
    }

    const requestBody = {
      fields: fields,
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const responseText = await response.text();
    let errorData: Bitrix24ErrorResponse = {};
    
    try {
      errorData = JSON.parse(responseText) as Bitrix24ErrorResponse;
    } catch {
      // Agar JSON parse qilish mumkin bo'lmasa
      console.error('Response is not JSON:', responseText);
    }

    if (!response.ok) {
      const errorMessage = errorData.error_description || 
                           errorData.error || 
                           errorData.error_message ||
                           `HTTP error! status: ${response.status}`;
      
      console.error('Bitrix24 Error Response:', {
        status: response.status,
        statusText: response.statusText,
        errorData: errorData,
        responseText: responseText
      });

      // 401 yoki 403 xatoliklari uchun maxsus xabar
      if (response.status === 401 || response.status === 403) {
        throw new Error(
          `Webhook token yetarli huquqlarga ega emas. ` +
          `Bitrix24'da webhook yaratishda "CRM" va "Contact qo'shish" huquqlarini berish kerak. ` +
          `Xatolik: ${errorMessage}`
        );
      }

      throw new Error(errorMessage);
    }

    const data: Bitrix24Response = JSON.parse(responseText);

    if (data.error) {
      throw new Error(data.error_description || data.error);
    }

    return data;
  } catch (error) {
    console.error('Bitrix24 API xatosi:', error);
    throw error;
  }
};

/**
 * Bitrix24'ga deal qo'shish
 * @param dealData - Deal ma'lumotlari
 * @returns Promise<Bitrix24Response>
 */
export const addDealToBitrix24 = async (
  dealData: Bitrix24DealData
): Promise<Bitrix24Response> => {
  const webhookUrl = 'https://crm.usatportal.uz/rest/76/st53k7s56ybsf289/crm.deal.add.json';

  try {
    const fields = {
      TITLE: dealData.TITLE,
      CONTACT_ID: dealData.CONTACT_ID,
      COMMENTS: dealData.COMMENTS || '',
      SOURCE_ID: dealData.SOURCE_ID || 'WEB',
      ...(dealData.CATEGORY_ID !== undefined ? { CATEGORY_ID: dealData.CATEGORY_ID } : {}),
      ...(dealData.UF_CRM_1769674454 !== undefined ? { UF_CRM_1769674454: dealData.UF_CRM_1769674454 } : {}),
      ...(dealData.UF_CRM_1769674491 !== undefined ? { UF_CRM_1769674491: dealData.UF_CRM_1769674491 } : {}),
      ...(dealData.UF_CRM_1769674557 !== undefined ? { UF_CRM_1769674557: dealData.UF_CRM_1769674557 } : {}),
      ...(dealData.UF_CRM_1769750196 !== undefined ? { UF_CRM_1769750196: dealData.UF_CRM_1769750196 } : {}),
    };

    const requestBody = {
      fields: fields,
    };

    console.log('Bitrix24 Deal Request URL:', webhookUrl);
    console.log('Bitrix24 Deal Request Body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const responseText = await response.text();
    let errorData: Bitrix24ErrorResponse = {};

    try {
      errorData = JSON.parse(responseText) as Bitrix24ErrorResponse;
    } catch {
      console.error('Deal response is not JSON:', responseText);
    }

    if (!response.ok) {
      const errorMessage = errorData.error_description ||
                           errorData.error ||
                           errorData.error_message ||
                           `HTTP error! status: ${response.status}`;

      console.error('Bitrix24 Deal Error Response:', {
        status: response.status,
        statusText: response.statusText,
        errorData: errorData,
        responseText: responseText
      });

      if (response.status === 401 || response.status === 403) {
        throw new Error(
          `Webhook token yetarli huquqlarga ega emas. ` +
          `Bitrix24'da webhook yaratishda "CRM" va "Deal qo'shish" huquqlarini berish kerak. ` +
          `Xatolik: ${errorMessage}`
        );
      }

      throw new Error(errorMessage);
    }

    const data: Bitrix24Response = JSON.parse(responseText);

    if (data.error) {
      throw new Error(data.error_description || data.error);
    }

    return data;
  } catch (error) {
    console.error('Bitrix24 Deal API xatosi:', error);
    throw error;
  }
};

/**
 * Ism va familiyani ajratish
 * @param fullName - To'liq ism
 * @returns { name: string, lastName: string }
 */
export const parseFullName = (fullName: string): { name: string; lastName: string } => {
  const parts = fullName.trim().split(/\s+/);
  
  if (parts.length === 1) {
    return { name: parts[0], lastName: '' };
  }
  
  if (parts.length === 2) {
    return { name: parts[0], lastName: parts[1] };
  }
  
  // Agar 3 yoki undan ko'p bo'lsa, birinchi ism, qolganlari familiya
  return {
    name: parts[0],
    lastName: parts.slice(1).join(' '),
  };
};
