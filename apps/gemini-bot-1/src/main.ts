console.log('Hello World');
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

function fileToGenerativePart(filePath: string, mimeType: string) {
  // RETURN
  return {
    inlineData: {
      data: Buffer.from(
        fs.readFileSync(path.resolve(__dirname, filePath))
      ).toString('base64'),
      mimeType,
    },
  };
}

(async () => {
  // VARIABLES
  const genAI = new GoogleGenerativeAI(process.env.NX_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

  // PROMPT
  const prompt =
    'How many buttons are visible in this webpage? Describe the buttons in as much detail as possible. Provide the x and y pixel axis positions of each button.';
  const webpageScreenshot = fileToGenerativePart(
    './assets/template-1.png',
    'image/png'
  );
  const result = await model.generateContent([prompt, webpageScreenshot]);
  const response = result.response;
  const reply = response.text();

  // OUTPUT
  console.log({ reply });
})();
