import fs from "fs";
import path from "path";
import { gallery } from "./stores";

export async function generatePhotos() {
	console.log("Generating photos...");

	const { blobs } = await gallery.list();
	
	// Generate photos from blobs
	for (const { key } of blobs) {
		const { data, metadata } = await gallery.getWithMetadata(key, {
			type: "arrayBuffer",
		});

		const filePath = path.join(__dirname, '..', 'gallery', `${key}.${metadata.ext}`);
		
		await fs.promises.writeFile(filePath, Buffer.from(data))
			.then(() => console.log(`Created ${key}.${metadata.ext} successfully!`))
			.catch((err) => console.error(`Error generating ${key}.${metadata.ext}: ${err.message}`))
	}
}

await generatePhotos();