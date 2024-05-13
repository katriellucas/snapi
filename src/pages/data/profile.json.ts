
export const prerender = true
import { user } from '../../libs/stores';

export async function GET() {

	return new Response(
		JSON.stringify(await user.get('profile', { type: 'json' }))
	)
}