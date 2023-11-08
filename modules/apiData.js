import { loginElement } from "./varibales";

export const getApi = () => {
	return fetch(
		"https://wedev-api.sky.pro/api/v1/dmitriev-denis/comments",
		{
			method: "GET",
		}
	)
		.then((response) => {
			return response.json();
		});
};

export const postApi = (nameElement, textElement) => {
	return fetch("https://wedev-api.sky.pro/api/v1/dmitriev-denis/comments", {
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
	});
};

//функция атворизации
const hostApiAuth = 'https://wedev-api.sky.pro/api/user/login';
const renderlogin = () => {
	return fetch(hostApiAuth, {
		method: "POST",
		headers: {
			Authorization: "123456"
		}
	}).then((response) => {
		return response.json();
	}).then((responseData) => {
		console.log(responseData);
	})
}