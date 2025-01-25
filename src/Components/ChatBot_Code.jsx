import React, { useState } from "react";

import { getGeminiResponse } from "../../geminiApi";

import "./ChatBot_Code.css";

export default function ChatBot_Code() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typingMessage, setTypingMessage] = useState(""); // To handle typing effect

  const handleSendMessage = async () => {
    if (input) {
      // Add user message
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");

      // Check if the user is asking for code
      if (
        input.toLowerCase().includes("code") ||
        input.toLowerCase().includes("program") ||
        input.toLowerCase().includes("algorithm") ||
        input.toLowerCase().includes("algo") ||
        input.toLowerCase().includes("syntax") ||
        input.toLowerCase().includes("snippet") ||
        input.toLowerCase().includes("script") ||
        input.toLowerCase().includes("example code") ||
        input.toLowerCase().includes("sample code") ||
        input.toLowerCase().includes("source code") ||
        input.toLowerCase().includes("write a code") ||
        input.toLowerCase().includes("generate code") ||
        input.toLowerCase().includes("coding") ||
        input.toLowerCase().includes("java code") ||
        input.toLowerCase().includes("python code") ||
        input.toLowerCase().includes("c++ code") ||
        input.toLowerCase().includes("javascript code") ||
        input.toLowerCase().includes("implementation") ||
        input.toLowerCase().includes("pseudo code") ||
        input.toLowerCase().includes("logic") ||
        input.toLowerCase().includes("steps for code") ||
        input.toLowerCase().includes("executable code")
      ) {
        const botMessage =
          "Sorry, I can't provide code snippets at the moment. Please try asking something else!";
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botMessage, sender: "bot" },
        ]);
        return; // Stop further execution
      }

      try {
        // Fetch Gemini API response
        const botResponse = await getGeminiResponse(input);

        // Safely extract bot message text
        const botMessage = botResponse.candidates
          ? botResponse.candidates[0]?.content?.parts[0]?.text || "No response"
          : "No response";

        // Simulate typing effect
        simulateTypingEffect(botMessage);
      } catch (error) {
        console.error("Error fetching chatbot response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Error fetching response from bot", sender: "bot" },
        ]);
      }
    }
  };

  // Function to simulate typing effect
  const simulateTypingEffect = (text) => {
    setTypingMessage(""); // Reset typing message
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setTypingMessage((prev) => prev + text[index]); // Add one letter at a time
        index++;
      } else {
        clearInterval(typingInterval); // Stop when typing is complete
        setMessages((prevMessages) => [
          ...prevMessages,
          { text, sender: "bot" },
        ]);
        setTypingMessage(""); // Clear typing message after it's added
      }
    }, 5); // Adjust speed of typing (50ms per letter)
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
        {typingMessage && ( // Show typing message while typing
          <div className="message bot">{typingMessage}</div>
        )}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          placeholder="Ask me something..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}
