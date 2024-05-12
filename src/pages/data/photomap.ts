
export const prerender = true
import { gallery } from '../../libs/stores';
import { photoList } from '../../libs/helpers';

export async function GET() {

	const { blobs } = await gallery.list();

	const photomap = await Promise.all(blobs.map(async ({ key }) => {
		const metadata = await gallery.getMetadata(key).then((i) => i?.metadata);

		return {
			key,
			metadata,
			src: await photoList[`/src/gallery/${key}.${metadata?.ext}`](),
		};
	}));

	return new Response(
		JSON.stringify(photomap)
	)
}