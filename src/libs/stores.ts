import { getStore } from "@netlify/blobs";

export const gallery = getStore({
	name: "gallery",
	siteID: import.meta.env.SITE_ID,
	token: import.meta.env.SNAPI_TOKEN
});