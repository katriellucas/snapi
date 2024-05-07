import fs from "fs";
import { getStore } from "@netlify/blobs";

var netlifyBlobsContext: any = {
	edgeURL: 'https://api.netlify.com',
	token: 'your-access-token',
	siteID: 'your-site-id'
};

netlifyBlobsContext = btoa(JSON.stringify(netlifyBlobsContext));
console.log(netlifyBlobsContext)

export async function generatePhotos() {
	const gallery = getStore( "gallery" );

	const { blobs } = await gallery.list();
	
	// Generate photos from blobs
	for (const { key } of blobs) {
		const { data, metadata } = await gallery.getWithMetadata(key, {
			type: "arrayBuffer",
		});
	
		// Can also use new Uint8Array() instead of Buffer.from();
		fs.writeFile(`./src/gallery/${key}.${metadata.ext }`, Buffer.from(data), (err) => {
			if (err) throw err;
			console.log(`Created ${key}.${metadata.ext} successfully!`);
		});
	}
}
