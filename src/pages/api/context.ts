import type { APIRoute } from 'astro'
export const prerender = false;


export const GET: APIRoute = () => {
	let test = atob(import.meta.env.NETLIFY_BLOBS_CONTEXT)

	return new Response(test)
}

// export async function GET() {
// 	return new Response();
// }