import { user } from '../libs/stores';

export async function validSession(session: string | undefined): Promise<boolean> {
	try {
		console.error("Getting session from blob store:");
		const token = await user.get('session');
		return (session !== undefined) && (session === token);
	} catch (error) {
		console.error("Error validating session:", error);
		return false;
	}
}