import { user } from '../libs/stores';

export async function validSession(session: string | undefined): Promise<boolean> {
	const token = await user.get('session');

	if (session) {
		return (session !== undefined) && (session === token);
	} else {
		return false;
	}
}