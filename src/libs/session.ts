import { user } from '../libs/stores';

export async function validSession(session: string | undefined): Promise<boolean> {
	const token = await user.get('session');
	console.log(token, session);
	if (session && session === token) {
		return true;
	} else {
		return false;
	}
}