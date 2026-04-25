export default async function handler(req, res) {
  const { message } = req.body;

  const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method:"POST",
    headers:{
      "Authorization":`Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      model:"openai/gpt-4o-mini",
      messages:[{role:"user",content:message}]
    })
  });

  res.status(200).json(await r.json());
}
