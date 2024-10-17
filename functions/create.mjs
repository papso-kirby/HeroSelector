import { getStore } from "@netlify/blobs";

function generateRandomString(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

export default async function handler(request, context) {
    console.log("Received form data:");
    try {
        if (request.method !== "POST") {
            return new Response(JSON.stringify({ message: "Method Not Allowed" }), {
                statusCode: 405,
                body: JSON.stringify({ message: "Method Not Allowed" }),
            });
        }

        const payload = await request.json();

        console.log("Received form data:", payload);

        const sessions = getStore("sessions");
        const session = {
            id: generateRandomString(),
            keyA: generateRandomString(4),
            keyB: generateRandomString(4),
            heroA1: payload.hero1,
            heroA2: payload.hero2,
            heroA3: payload.hero3,
            heroB1: undefined,
            heroB2: undefined,
            heroB3: undefined,
            ban1: undefined,
            ban2: undefined
        };

        await sessions.setJSON(session.id, session);

        return new Response(
            JSON.stringify(session), {
            statusCode: 200,
            headers: { "Content-Type": "application/json", }
        });
    } catch (error) {
        console.error("Error processing form data:", error);
        return new Response(
            JSON.stringify({
                message: "Internal Server Error"
            }), {
            statusCode: 500,
            headers: { "Content-Type": "application/json", },
        });
    }
}

export const config = {
    path: "/create"
};
