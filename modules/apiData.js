import {
	hostApiAuth,
} from "./varibales.js";
import { token, } from "./renderData.js";



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

//функция атворизации юзера --начало
export const loginUser = ({ loginInputElement, passwordInputElement }) => {
	return fetch(hostApiAuth, {
		method: "POST",
		body: JSON.stringify({
			login: loginInputElement.value,
			password: passwordInputElement.value,
		})
	}).then((response) => {
		if (response.status === 400) {
			alert("передан неправильный логин или пароль").stopPropagation();
		} else {
			return response.json();
		}
	})
}
//функция атворизации юзера --конец
