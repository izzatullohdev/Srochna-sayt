/**
 * Bitrix24 CRM API utility funksiyalari
 */

interface Bitrix24LeadData {
  TITLE: string;
  NAME?: string;
  LAST_NAME?: string;
  PHONE: Array<{ VALUE: string; VALUE_TYPE: string }>;
  SOURCE_ID?: string;
  STATUS_ID?: string;
  COMMENTS?: string;
}

interface Bitrix24Response {
  result?: number; // Lead ID
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
 * Bitrix24'ga lead qo'shish
 * @param leadData - Lead ma'lumotlari
 * @returns Promise<Bitrix24Response>
 */
export const addLeadToBitrix24 = async (
  leadData: Bitrix24LeadData
): Promise<Bitrix24Response> => {
  const bitrix24WebhookUrl = import.meta.env.VITE_BITRIX24_WEBHOOK_URL;

  if (!bitrix24WebhookUrl) {
    throw new Error('Bitrix24 webhook URL topilmadi. Iltimos, .env faylini tekshiring.');
  }

  // Webhook URL yaratish
  const webhookUrl = `${bitrix24WebhookUrl}crm.lead.add.json`;

  try {
    const requestBody = {
      fields: {
        TITLE: leadData.TITLE,
        NAME: leadData.NAME,
        PHONE: leadData.PHONE,
      },
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
          `Bitrix24'da webhook yaratishda "CRM" va "Lead qo'shish" huquqlarini berish kerak. ` +
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
