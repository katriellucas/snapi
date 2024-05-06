import { getStore } from "@netlify/blobs";

const gallery = getStore("gallery");

let blobCount = 0;

console.log(await gallery.list({ paginate: true }))


for await (const entry of gallery.list({ paginate: true })) {
	console.log(entry)
}

console.log('------------------------')

const path = "./file.txt";
Bun.write(path, "Lorem ipsum");
