import fs from "fs";
// import { getStore } from "@netlify/blobs";

export async function generatePhotos(blobs: { greeting: any; }) {
	console.log(blobs.greeting)
	// const gallery = getStore( "gallery" );

	// const { blobs } = await gallery.list();
	
	// Generate photos from blobs
	for (const { key, data, metadata } of blobs.greeting) {
		// const { data, metadata } = await gallery.getWithMetadata(key, {
		// 	type: "arrayBuffer",
		// });
		// console.log(`Created ${key}.${metadata.ext} successfully!`);

		// Can also use new Uint8Array() instead of Buffer.from();
		fs.writeFile(`./src/gallery/${key}.${metadata.ext }`, Buffer.from(data), (err) => {
			if (err) throw err;
			console.log(`Created ${key}.${metadata.ext} successfully!`);
		});
	}
}
