import { loginElement } from "./varibales.js";

export const getApi = () => {
	return fetch(
		"https://wedev-api.sky.pro/api/v2/dmitriev-denis/comments",
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	)
		.then((response) => {
			return response.json();
		});
};

export const postApi = (nameElement, textElement) => {
	return fetch("https://wedev-api.sky.pro/api/v2/dmitriev-denis/comments", {
		method: "POST",
		body: JSON.stringify({
			forceError: true,
			name: nameElement.value
				.replaceAll("<", "&lt;")
				.replaceAll(">", "&gt;"),
			text: textElement.value
				.replaceAll("<", "&lt;")
				.replaceAll(">", "&gt;"),
		}),
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
};



