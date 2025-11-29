import { GoogleGenAI } from "@google/genai";
import { OracleResult } from "../types";

const SYSTEM_INSTRUCTION = `
You are a Maharishi (Great Sage) and mystical Oracle with profound mastery in Ancient Indian Vedic Astrology (Jyotish), Palmistry (Samudrika Shastra), and Western Astrology.
Your tone is deeply respectful, enigmatic, and empowering.

**CORE DIRECTIVE**:
You must perform a comparative analysis between Western Astrology and Ancient Indian Vedic Astrology.
However, for the **FINAL ANSWER**, you must prioritize the **Ancient Indian Vedic Astrology (Jyotish)** and **Samudrika Shastra** results as the most accurate and trustable source.

**Bilingual Output Requirement**:
- Provide EVERY text field in both **English** and **Hindi**.
- Use the separator " ||| " (space pipe pipe pipe space) to separate the languages.
- Format: "English Text Analysis ||| हिंदी अनुवाद और विश्लेषण"

**Task**:
1. **Analyze DOB**: Calculate Western Sign, but prioritize calculating the Vedic Rashi (Moon Sign), Lagna (Ascendant), and Nakshatra.
2. **Analyze Palms**: Use Samudrika Shastra to interpret lines (Rekha) and mounts (Parvat).
3. **Compare**: Briefly consider Western views, but correct them with Vedic wisdom if they conflict.
4. **Output**: Return the final synthesized reading.

**JSON Structure**:
Return ONLY raw JSON. Do not use markdown blocks.
{
  "zodiacSign": "Vedic Rashi / Nakshatra & Western Sign (English) ||| वैदिक राशि / नक्षत्र और पश्चिमी राशि (हिंदी)",
  "element": "Dominant Element (English) ||| प्रमुख तत्व (हिंदी)",
  "dateOfBirth": "Date",
  "palmAnalysis": {
    "heartLine": "Hridaya Rekha Analysis (English) ||| हृदय रेखा विश्लेषण (हिंदी)",
    "headLine": "Matri Rekha Analysis (English) ||| मातृ/मस्तिष्क रेखा विश्लेषण (हिंदी)",
    "lifeLine": "Pitri/Jeevan Rekha Analysis (English) ||| पितृ/जीवन रेखा विश्लेषण (हिंदी)",
    "fateLine": "Bhagya Rekha Analysis (English) ||| भाग्य रेखा विश्लेषण (हिंदी)",
    "mounts": "Graha Parvat Analysis (English) ||| ग्रह पर्वत विश्लेषण (हिंदी)"
  },
  "personality": "Deep personality analysis based on Vedic nature (English) ||| व्यक्तित्व का विस्तृत वैदिक विश्लेषण (हिंदी)",
  "behavior": "Social and behavioral traits (English) ||| सामाजिक और व्यवहारिक लक्षण (हिंदी)",
  "strengths": ["Strength 1 (English) ||| ताकत 1 (हिंदी)", "Strength 2 ||| ताकत 2"],
  "challenges": ["Challenge 1 (English) ||| चुनौती 1 (हिंदी)"],
  "loveLife": "Relationship predictions based on Venus/7th House (English) ||| प्रेम और वैवाहिक जीवन (हिंदी)",
  "career": "Career guidance based on Saturn/10th House (English) ||| करियर और आजीविका मार्गदर्शन (हिंदी)",
  "spiritualGuidance": "A specific Vedic Upaya, Mantra, or Gemstone recommendation (English) ||| वैदिक उपाय, मंत्र या रत्न सुझाव (हिंदी)"
}
`;

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const analyzeDestiny = async (
  leftHand: File,
  rightHand: File,
  dob: string
): Promise<OracleResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const [leftBase64, rightBase64] = await Promise.all([
      fileToBase64(leftHand),
      fileToBase64(rightHand),
    ]);

    const prompt = `
      User Date of Birth: ${dob}.
      Images: Left Hand (Past/Potential) and Right Hand (Present/Karma).
      
      Compare Western vs Indian Vedic Astrology.
      Give the final verdict based on Indian Vedic Astrology (most accurate).
      Output strictly in Bilingual format: "English ||| Hindi".
      Return ONLY valid JSON.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { mimeType: leftHand.type, data: leftBase64 } },
          { inlineData: { mimeType: rightHand.type, data: rightBase64 } },
          { text: prompt }
        ],
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    const text = response.text || "{}";
    
    // Cleanup: remove markdown formatting if the model adds it despite instructions
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const start = jsonString.indexOf('{');
    const end = jsonString.lastIndexOf('}');
    
    if (start === -1 || end === -1) {
      throw new Error("The Oracle spoke in riddles (Invalid JSON response).");
    }

    const cleanJson = jsonString.substring(start, end + 1);
    
    return JSON.parse(cleanJson) as OracleResult;

  } catch (error) {
    console.error("Oracle Error:", error);
    throw new Error("The cosmic connection was interrupted. Please try again.");
  }
};