import type { APIRoute } from "astro";
import axios from 'axios';

export const POST: APIRoute = async ({ request, cookies }) => {
  let req = await request.json();
  let data = await req.data;
  
  
  // Request API.
  // Add your own code here to customize or restrict how the public can register new users.
  let res = await axios
  .post(`${import.meta.env.STRAPI_URL}/api/auth/local`, data)
  .then(response => {
    // Handle success.
    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
    cookies.set("strapi-user-name", response.data.user.username, { path: '/' })
    cookies.set("strapi-user-token", response.data.jwt, { path: '/' })

    return {success: true, token: response.data.jwt};
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
    return {success: false, error: 'Wrong Username or Password'};
  });

  return new Response(JSON.stringify(res))
};