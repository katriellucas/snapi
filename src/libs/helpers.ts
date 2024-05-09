import type { ImageMetadata } from 'astro';
export const photoList =
	import.meta.glob<{ default: ImageMetadata }>('/src/gallery/*.{jpeg,jpg,png,gif}') ?? [];
