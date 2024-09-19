import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
    const data = Object.fromEntries(new URL(request.url).searchParams.entries())
    const result = { product:{}, success:false, error: "" }
    
    let product_id = Number.parseInt(data.id)
    
    if(data.id && !isNaN(product_id) && product_id > 0) {
        result.product = {"id":product_id, "name":"Product Name"}
        result.success = true
    } else {
        result.error = "Product id is Missing or Invalid"
    }

    return new Response(
        JSON.stringify(result), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
};