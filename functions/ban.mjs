import { getStore } from "@netlify/blobs";

export default async function handler(request, context) {
    try {
        if (request.method !== "POST") {
            return new Response(JSON.stringify({ message: "Method Not Allowed" }), {
                statusCode: 405,
                body: JSON.stringify({ message: "Method Not Allowed" }),
            });
        }

        const { sessionID } = context.params;
        const payload = await request.json();
        const sessions = getStore("sessions");
        const session = JSON.parse(await sessions.get(sessionID, 'json'));

        if (payload.playerKey == session.keyA)
            session.ban1 = payload.hero;
        else
            session.ban2 = payload.hero;

        await sessions.setJSON(session.id, session);

        return new Response(
            JSON.stringify({
                message: "Hero banned",
                data: session
            }), {
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
    path: "/ban/:sessionID"
};
