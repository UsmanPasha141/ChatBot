import axios from "axios";

const geminiAPIKey = import.meta.env.VITE_GEMINI_API_KEY;

const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiAPIKey}`;

// Function to fetch chatbot responses

export const getGeminiResponse = async (message) => {
  try {
    const response = await axios.post(
      geminiEndpoint,
      {
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Handle the response from Gemini API
    return response.data; // Assuming the response contains the generated content
  } catch (error) {
    console.error("Error fetching chatbot response from Gemini API:", error);
    return "Sorry, something went wrong!";
  }
};
