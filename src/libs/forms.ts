import { fileTypeFromBlob } from 'file-type';
import { gallery, user } from '../libs/stores';

export async function uploadPhotoForm(formData: any) {
	try {
		const file = formData.get('file') as File;
		const uuid = Date.now().toString();

		// Check if photo already exists
		if (await gallery.get(uuid)) {
			return 'Photo already exists.';
		}

		// Check if file type is valid
		const fileType = await fileTypeFromBlob(file);

		if (fileType?.ext && !['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'].includes(fileType.ext)) {
			return 'Invalid file type.';
		}

		await gallery.set(uuid, file, { metadata: fileType });
	} catch (error) {
		console.error(error);
		return 'Some error ocurred.';
	}
}

export async function profileUpdateForm(formData: any) {
	try {
		const name = formData.get('name');
		const job = formData.get('job');
		const description = formData.get('description');
		const action_label = formData.get('action-label');
		const action_link = formData.get('action-label');

		user.setJSON('profile', { name, job, description, action_label, action_link });

	} catch (error) {
		console.error(error);
		return 'Some error ocurred.';
	}
}

export async function deployForm() {
	const buildHookUrl = import.meta.env.BUILD_HOOK
	const options = {
		method: 'POST', // Request method
		headers: {
			'Content-Type': 'application/json', // Specify content type as JSON
		},
		body: JSON.stringify({}), // Empty JSON body as no additional data is needed
	};

	// Send the fetch request
	fetch(buildHookUrl, options)
		.then(response => {
			if (!response.ok) throw new Error('Failed to trigger build hook');
			console.log('Build hook triggered successfully');
		})
		.catch(error => console.error('Error triggering build hook:', error.message))
}