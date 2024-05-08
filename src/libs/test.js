import fs from "fs";
import { getStore } from "@netlify/blobs";


	const gallery = getStore({
		name: "gallery",
		siteID: process.env.SITE_ID,
		token: process.env.SNAPI_TOKEN
	});

	const { blobs } = await gallery.list();

	// Generate photos from blobs
	for (const { key } of blobs) {
		const { data, metadata } = await gallery.getWithMetadata(key, {
			type: "arrayBuffer",
		});
		console.log(`Created ${key}.${metadata.ext} successfully!`);

		// Can also use new Uint8Array() instead of Buffer.from();
		fs.writeFileSync(`./public/${key}.${metadata.ext}`, Buffer.from(data));
	}
