import axios from "axios";

const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

export const generateQuestion = async (topic: string) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an assistant that generates valid JSON responses.",
          },
          {
            role: "user",
            content: `${topic} Generate a JSON object with the following structure: [{\\"id\\": 1, \\"question\\": \\"string\\", \\"correctAnswer\\": \\"string\\", \\"choices\\": [{\\"id\\": number, \\"title\\": \\"string\\"}]}] Respond with the JSON object only, without using code blocks, backticks, or additional text.`,
          },
        ],
        max_tokens: 1000,
        temperature: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiApiKey}`,
        },
      }
    );
    return JSON.parse(response.data.choices[0].message.content.trim());
  } catch (error) {
    console.log("Error generating question:", error);
    return "Error generating question";
  }
};
