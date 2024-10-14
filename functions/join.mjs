import { getStore } from "@netlify/blobs";

export default async function handler(request, context) {
    console.log("Received form data:");
    try {
        if (request.method !== "POST") {
            return new Response(JSON.stringify({ message: "Method Not Allowed" }), {
                statusCode: 405,
                body: JSON.stringify({ message: "Method Not Allowed" }),
            });
        }

        const { sessionID } = context.params;

        const formData = await request.json();

        console.log("Received form data:", formData);

        const sessions = getStore("sessions");
        const session = JSON.parse(await sessions.get(sessionID, 'json'));

        session.heroB1 = formData.hero1;
        session.heroB2 = formData.hero2;
        session.heroB3 = formData.hero3;

        await sessions.setJSON(session.id, session);

        return new Response(
            JSON.stringify({
                message: "Session joined",
                data: session
            }), {
            statusCode: 200,
            headers: { "Content-Type": "application/json", }
        });
    } catch (error) {
        console.error("Error processing form data:", error);
        return new Response(
            JSON.stringify({
                message: "Internal Server Error, " + error
            }), {
            statusCode: 500,
            headers: { "Content-Type": "application/json", },
        });
    }
}

export const config = {
    path: "/join/:sessionID"
};
