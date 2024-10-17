import { getStore } from "@netlify/blobs";

export default async function handler(request, context) {
    try {
        if (request.method !== "GET") {
            return new Response(JSON.stringify({ message: "Method Not Allowed" }), {
                statusCode: 405,
                body: JSON.stringify({ message: "Method Not Allowed" }),
            });
        }

        const { id } = context.params;
        const sessions = getStore("sessions");
        const session = await sessions.get(id, 'json');

        return new Response(
            JSON.stringify(session), {
            statusCode: 200,
            headers: { "Content-Type": "application/json", }
        });
    } catch (error) {
        console.error("Error processing form data:", error);
        return new Response(
            JSON.stringify({
                message: "Internal Server Error " + error
            }), {
            statusCode: 500,
            headers: { "Content-Type": "application/json", },
        });
    }
}

export const config = {
    path: "/sessions/:id"
};
