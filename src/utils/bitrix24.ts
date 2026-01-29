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
}

interface Bitrix24Response {
  result?: number; // Contact ID
  error?: string;
  error_description?: string;
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
    const requestBody = {
      fields: {
        NAME: contactData.NAME || '',
        LAST_NAME: contactData.LAST_NAME || '',
        PHONE: contactData.PHONE || [],
        EMAIL: contactData.EMAIL || [],
        COMMENTS: contactData.COMMENTS || '',
        ADDRESS: contactData.ADDRESS || '',
        SOURCE_ID: contactData.SOURCE_ID || 'WEB',
      },
    };

    console.log('Bitrix24 Request URL:', webhookUrl);
    console.log('Bitrix24 Request Body:', JSON.stringify(requestBody, null, 2));

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
