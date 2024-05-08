import fs from "fs";
import { getStore } from "@netlify/blobs";

export async function generatePhotos() {
	console.log("Generating photos...");
	const gallery = getStore({
		name: "gallery", 
		siteID: import.meta.env.SITE_ID,
		token: import.meta.env.SNAPI_TOKEN
	});

	const { blobs } = await gallery.list();
	
	// Generate photos from blobs
	for (const { key } of blobs) {
		const { data, metadata } = await gallery.getWithMetadata(key, {
			type: "arrayBuffer",
		});
		console.log(`Created ${key}.${metadata.ext} successfully!`);

		// Can also use new Uint8Array() instead of Buffer.from();
		fs.writeFile(`./public/${key}.${metadata.ext }`, Buffer.from(data), (err) => {
			if (err) throw err;
			console.log(`Created ${key}.${metadata.ext} successfully!`);
		});
	}
}
