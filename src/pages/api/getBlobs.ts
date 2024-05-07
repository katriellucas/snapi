export const prerender = false;

import type { APIRoute } from 'astro'
import { getStore } from "@netlify/blobs";

export const GET: APIRoute = async () => {
	const gallery = getStore("gallery");
	const { blobs } = await gallery.list();
	const list = []

	// Generate photos from blobs
	for (const { key } of blobs) {
		const { data, metadata } = await gallery.getWithMetadata(key, {
			type: "arrayBuffer",
		});

		console.log(`Created ${key}.${metadata.ext} successfully!`);
		list.push({ key, data, metadata })
	}

	return new Response(
		JSON.stringify({
			greeting: list,
		}),
	)
}

// import fs from "fs";

export async function generatePhotos() {

	
}
