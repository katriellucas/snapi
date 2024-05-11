import { user } from '../libs/stores';

export async function validSession(session: string | undefined) {
	setTimeout(async () => {
		try {
			console.error("Getting session from blob store:");
			const token = await user.get('session');
			return session && session === token;
		} catch (error) {
			console.error("Error validating session:", error);
			return false;
		}
	}, 500); // 500 milliseconds delay
}