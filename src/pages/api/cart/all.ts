import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
    const data = [{"id":1, "name":"product name"}, {"id":2, "name":"product name"}]
    const result = { data: data }
    
    return new Response(
        JSON.stringify(result), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
};