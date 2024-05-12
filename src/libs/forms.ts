import { fileTypeFromBlob } from 'file-type';
import { gallery, user } from '../libs/stores';

export async function uploadPhotoForm(formData: any) {
	try {
		console.log(formData);
		const file = formData.get('file') as File;
		const alt = formData.get('alt');
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

		await gallery.set(uuid, file, { metadata: {...fileType, alt} });

		const profile = await user.get('profile', { type: 'json' });
		await user.setJSON('profile', { ...profile, has_updates: true });

		return 'Photo uploaded successfully!';
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

		await user.setJSON('profile', { name, job, description, action_label, action_link, has_updates: true });

		return 'Profile updated successfully!';
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
	return await fetch(buildHookUrl, options)
		.then(async response => {
			if (!response.ok) return 'Failed to trigger build hook';
			const profile = await user.get('profile', { type: 'json' });
			await user.setJSON('profile', { ...profile, has_updates: false });
			return 'Build hook triggered successfully, your Snapi will be deployed soon';
		})
		.catch(error => 'Error triggering build hook: ' + error.message)
}