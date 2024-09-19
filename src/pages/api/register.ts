import type { APIRoute } from "astro";
import axios from 'axios';

export const POST: APIRoute = async ({ request }) => {
  let req = await request.json();
  let data = await req.data;
  
  let res = await axios
  .post(`${import.meta.env.STRAPI_URL}/api/auth/local/register`, data)
  .then(response => {
    // Handle success.
    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
    return {success: true, token: response.data.jwt};
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
    return {success: false, error: 'An error occurred'};
  });

  return new Response(JSON.stringify(res))
}

