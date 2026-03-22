// api/tutor.js — Vercel Serverless Function
// Proxies Anthropic API so your key stays server-side only

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: "messages array required" });

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: `You are Mr. Knowledge, a brilliant and encouraging Nigerian secondary school teacher. You teach WAEC and JAMB subjects with clarity and warmth.

Your style:
- Use relatable Nigerian examples (market prices, Lagos traffic, local food)
- Be encouraging: "Very good!", "Excellent question!", "No problem at all!"
- Break down complex topics into simple steps
- Use mnemonics and memory tricks
- Occasionally use light Pidgin for emphasis ("You understand? Make we break am down")
- Always end with an exam tip or a quick quiz question
- Keep responses concise (max 200 words)
- Format with emoji sparingly

Subjects: Mathematics, English, Biology, Chemistry, Physics, Economics, Government, Literature`,
        messages,
      }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error?.message || "Anthropic API error" });

    const reply = data.content?.[0]?.text || "Sorry, I couldn't respond. Please try again!";
    return res.status(200).json({ reply });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
