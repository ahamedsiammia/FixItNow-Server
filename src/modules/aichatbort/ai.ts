import { Request, Response } from "express";

export const POST = async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY পাওয়া যায়নি! .env ফাইল চেক করুন।",
      });
    }

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request payload." });
    }

    // Convert messages for Gemini API
    const contents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.parts[0]?.text || "" }],
    }));

    const systemInstruction = {
      parts: [
        {
          text: "You are FixitBot, official AI assistant for FixitNow platform created by Team DevAxe (Lead: Md Siam). Help users politely in Bengali or English about AC, Plumbing, Electrical services, and Technician registration.",
        },
      ],
    };

    // Direct REST Fetch to standard Gemini Flash Model (gemini-1.5-flash)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
          systemInstruction,
          generationConfig: {
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      return res
        .status(response.status)
        .json({ error: errData.error?.message || "Google API Response Failed" });
    }

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "কোনো রেসপন্স পাওয়া যায়নি।";

    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error("Express Chat Controller Error:", error);
    return res.status(500).json({
      error: error?.message || "সার্ভারে কানেকশন সমস্যা হয়েছে।",
    });
  }
};