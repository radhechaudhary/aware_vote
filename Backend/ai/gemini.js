import { GoogleGenerativeAI} from "@google/generative-ai" ;

  const apiKey = "*****************";  // gemini Api key
  const genAI = new GoogleGenerativeAI(apiKey);  // create API object
  
  const model = genAI.getGenerativeModel({ // creating model object
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {  // function to run the AI for specific prompt
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    const text=result.response.text();
    const cleanedText = text.replace(/\*/g, ""); // Removes all "*"
    return cleanedText
  }
  
  export default run;