export default async function handler(
  req,
  res
) {

  const GEMINI_API_KEY =
    process.env
    .VITE_GEMINI_API_KEY;

  try {

    const {
      text,
      target
    } = req.body;

    const prompt = `
Translate this text by understanding context.

Text:
"${text}"

Target language:
${target}

Return ONLY translated text.
`;

    const response =
      await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt
                  }
                ]
              }
            ]
          })
        }
      );

    const data =
      await response.json();

    const translated =
      data?.candidates?.[0]
      ?.content?.parts?.[0]
      ?.text || "";

    res.status(200).json({
      translated
    });

  } catch (err) {

    res.status(500).json({
      error:
        "Translation failed"
    });

  }
}