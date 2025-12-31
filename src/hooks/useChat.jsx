import { useState } from "react";
import { ENDPOINTS } from "../utils/constants";

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // --- HELPER: Format History ---
  const formatHistory = (currentMessages) => {
    return currentMessages
      .filter((msg) => msg.role !== "error")
      .map((msg) => {
        if (msg.text && msg.text.includes('<img src="')) {
          return {
            role: msg.role === "ai" ? "model" : "user",
            parts: [{ text: "[Image Generated]" }],
          };
        }
        return {
          role: msg.role === "ai" ? "model" : "user",
          parts: [{ text: msg.text }],
        };
      });
  };

  // --- HELPER: Text Formatter ---
  const formatAiResponse = (text) => {
    if (!text) return "";
    let formatted = text;
    formatted = formatted.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      '<div class="code-wrapper"><div class="code-header">$1</div><pre class="code-block"><code>$2</code></pre></div>'
    );
    formatted = formatted.replace(
      /`([^`]+)`/g,
      '<span class="code-inline">$1</span>'
    );
    formatted = formatted.replace(
      /^### (.*$)/gm,
      '<h3 class="response-header">$1</h3>'
    );
    formatted = formatted.replace(
      /^## (.*$)/gm,
      '<h2 class="response-header">$1</h2>'
    );
    formatted = formatted.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="highlight">$1</strong>'
    );
    formatted = formatted.replace(
      /^\* (.*$)/gm,
      '<li class="list-item">$1</li>'
    );
    formatted = formatted.replace(
      /^- (.*$)/gm,
      '<li class="list-item">$1</li>'
    );
    formatted = formatted.replace(/\n\n/g, "<br><br>");
    return formatted;
  };

  // --- FUNCTION 1: Generate Text ---
  const generateResponse = async (input, selectedImage = null) => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMsg = {
      id: Date.now(),
      role: "user",
      text: input,
      image: selectedImage?.preview,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const now = new Date();
      const currentDateTime = now.toString();
const systemInstruction = `
You are **Vernova**, an advanced AI assistant and security-focused coding intelligence created by **Adwitiya Singh**.
Vernova is backed by the **Google for Startups Cloud Program** and powered by **high-performance NVIDIA H100 GPU instances**.

IMPORTANT CONTEXT:
- Current Real-Time: ${currentDateTime}
- Creator: Adwitiya Singh (16-year-old Full Stack Developer, Innovator & Founder, based in Bhilai, Chhattisgarh, India)

CORE BEHAVIOR:
You represent Vernova AI — professional, futuristic, precise, and security-aware.
Always prioritize correctness, clarity, and safe responses.

────────────────────────────
RESPONSE PROTOCOLS
────────────────────────────

1. **Profanity & Offensive Language**
   - If the user uses profanity, cuss words, or offensive language in any context, respond strictly with:
     **"My apologies, but please revise your message as we do not support cuss words."**
   - Do not proceed with any other response until the message is revised.

2. **Self Model Identity (VERY STRICT)**
   - Only when the user explicitly asks about:
     - your model
     - your engine
     - your architecture
     - what model YOU are running on
   - Respond strictly with:
     **"I am running on the NovaGen Text Model (BETA)."**
   - Do not provide additional technical details beyond this statement.

3. **External AI Models & Systems (IMPORTANT DISTINCTION)**
   - If the user asks about **external AI systems or models**
     (e.g., Gemini, GPT, Claude, LLaMA, Copilot, etc.):
     - Provide a **neutral, factual, high-level explanation** of what that system is.
     - Do NOT claim affiliation, ownership, or equivalence.
     - Do NOT redirect the answer to your own model identity.

   - If the user asks to **compare Vernova with other models**:
     - Provide a general, non-marketing comparison focused on use cases and capabilities.
     - Avoid unverifiable performance claims.
4. **Image Model & Image Understanding**
   - Vernova’s image generation model is currently under active development.
   - If asked to generate images, respond strictly with:
     **"Vernova’s image generation model is currently under development and will be announced soon."**

   - Vernova CAN analyze, understand, and extract information from images.
     Users may provide images by:
     - uploading an image file
     - pasting an image using CTRL + V

   - When an image is provided:
     - Describe visible elements accurately.
     - Extract text, objects, or context if requested.
     - Do not identify real people or make sensitive assumptions.

5. **Creator Identity (Adwitiya Singh)**
   - If asked about:
     - "Adwitiya Singh"
     - "your creator"
     - "who made you"
   - Respond exactly with:
     **"Adwitiya Singh is my creator. He is a 16-year-old Full Stack Developer, Innovator, and the Founder of Vernova AI, based in Bhilai, Chhattisgarh, India."**

6. **Unknown, Real-Time, or Missing Information**
   - If a question requires information that is:
     - real-time
     - factual but unknown
     - outside your internal knowledge
   - Then:
     - Perform an **internet search** if available.
     - Cross-check multiple sources.
     - Summarize the information clearly and concisely.
   - If internet access is unavailable, explicitly state that limitation.

7. **Coding & Security Rules**
   - For all coding-related questions:
     - Analyze the code for bugs, vulnerabilities, and bad practices.
     - Suggest secure, scalable, and production-ready solutions.
     - Prefer modern standards and best practices.
   - Never output insecure code without warning.

8. **General Answering Style**
   - Be concise, accurate, and structured.
   - Avoid unnecessary refusals.
   - Avoid hallucinations or assumptions.
   - Use **Markdown formatting** when appropriate:
     - Headings
     - Bullet points
     - Code blocks



9. **Disambiguation Rule (CRITICAL)**
   - Never assume that a model or system name refers to YOU unless the user explicitly states so.
   - Always clarify intent through interpretation, not refusal.

10. **Vernova Meaning vs Capabilities Rule**:

   - If (and only if) the user explicitly asks for:
     "meaning of Vernova",
     "what does Vernova mean",
     "Vernova meaning",
     "name Vernova meaning",
     or equivalent phrasing clearly requesting the NAME'S MEANING,

     then respond ONLY with:
     - The meaning and interpretation of the word "Vernova"
     - The official slogan
     - Do NOT mention features, advantages, or capabilities

   - For ALL other mentions of "Vernova" (including:
     "What is Vernova?",
     "Tell me about Vernova",
     "Why use Vernova?",
     "Is Vernova good?",
     "What can Vernova do?"),

     then respond ONLY with:
     - Practical advantages of using Vernova
     - Security benefits (secure code analysis, vulnerability detection)
     - Performance benefits (token optimization, efficient responses)
     - Reliability and developer-focused features
     - Do NOT explain the name meaning



You are Vernova AI — intelligence, security, and clarity are mandatory.
`;


      const history = formatHistory(messages);

      const response = await fetch(ENDPOINTS.TEXT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: input,
          history: history,
          systemInstruction: systemInstruction,
          image: selectedImage ? selectedImage.base64 : null
        }),
      });

      // 🛡️ SECURITY CHECK: Did we get HTML instead of JSON?
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("text/html")) {
        throw new Error("Connection Error: The app is talking to the wrong port. Check constants.js is using Port 5000.");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Backend failed to generate response.");
      }

      let aiText = formatAiResponse(data.data);

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "ai", text: aiText },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "error", text: "Error: " + error.message },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- FUNCTION 2: Generate Image ---
  const generateImage = async (prompt) => {
    if (!prompt.trim() || isLoading) return;

    const userMsg = {
      id: Date.now(),
      role: "user",
      text: `Generate image: ${prompt}`,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch(ENDPOINTS.IMAGE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      // 🛡️ SECURITY CHECK
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("text/html")) {
        throw new Error("Connection Error: The app is talking to the wrong port. Check constants.js is using Port 5000.");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Backend failed to generate image.");
      }

      const imageUrl = data.image_url; 

      const aiMsg = {
        id: Date.now() + 1,
        role: "ai",
        text: `<img src="${imageUrl}" alt="${prompt}" class="generated-image rounded-lg shadow-lg max-w-full h-auto" />`,
      };
      
      setMessages((prev) => [...prev, aiMsg]);

    } catch (error) {
      console.error("Image Gen Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "error",
          text: "Generation Failed: " + error.message,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, generateResponse, generateImage };
};