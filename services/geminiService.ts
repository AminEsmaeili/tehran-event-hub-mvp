
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getEventSuggestions = async (userQuery: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `کاربر می‌پرسد: "${userQuery}". بر اساس این درخواست، چند پیشنهاد برای رویدادهای فرهنگی یا تفریحی در تهران بده. پاسخ را به زبان فارسی و با لحنی دوستانه بده.`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "متأسفانه در حال حاضر نمی‌توانم پیشنهادی بدهم. لطفا دوباره تلاش کنید.";
  }
};
