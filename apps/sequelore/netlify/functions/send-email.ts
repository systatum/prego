import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  try {
    const { name, email, message } = JSON.parse(event.body || "{}");

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Name, Email, and Message are required",
        }),
      };
    }

    if (!process.env.POSTMARK_API_KEY) {
      throw new Error("POSTMARK_API_KEY is missing");
    }

    const postmark = require("postmark");
    const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

    const html = `
      <h2>New Collaboration Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `;

    await client.sendEmail({
      From: "adam@systatum.com",
      To: "adam@systatum.com",
      Subject: `New Collaboration Request - ${name} | ${email}"`,
      HtmlBody: html,
    });

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error: any) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Failed to send email" }),
    };
  }
};
