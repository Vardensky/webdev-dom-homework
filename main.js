import { getApi } from "./modules/apiData.js";
import { postApi, loginUser } from "./modules/apiData.js";
import { getCorrectDate } from "./modules/dateFunctions.js";
import { renderData, renderHtmlAuth, token, setToken, renderHtmlFormComments, setNameUser } from "./modules/renderData.js";
import { checkForms } from "./modules/checkForms.js";
import {
	ulElement,
	preLoaderText,
} from "./modules/varibales.js";
import { sentComment } from "./modules/sentComment.js";
import { format } from 'date-fns'


let commentsArray = [];

preLoaderText.textContent = "Загрузка комментариев ...";

const getFetchApi = () => {
	getApi()
		.then((response) => {
			const getApiComments = response.comments.map((comment) => {
				return {
					author: comment.author.name,
					date: format(new Date(comment.date), "yyyy-MM-dd hh.mm.ss"),
					likes: comment.likes,
					isLiked: false,
					text: comment.text,
				};
			});
			commentsArray = getApiComments;
			renderData(ulElement, commentsArray)
		})
		.then((response) => {
			preLoaderText.textContent = "";
			preLoaderText.classList.remove("margin");
		});
};

getFetchApi();

// Форма отправки комментариев 
const sendFormComments = () => {
	renderHtmlFormComments();
	const nameElement = document.getElementById("inputName");
	const textElement = document.getElementById("inputText");
	const buttonElement = document.getElementById("buttonPush");

	buttonElement.addEventListener('click', () => {
		//Отправляю комментарий
		sentComment(buttonElement, preLoaderText);
		renderHtmlFormComments();
		checkForms(buttonElement, textElement, nameElement);
		postApi(nameElement, textElement)
			.then((response) => {
				if (response.status === 400) {
					preLoaderText.textContent = "";
					throw new Error(alert("Имя и комментарий должны быть не короче 3 символов"));
				} else if (response.status === 500) {
					preLoaderText.textContent = "";
					throw new Error(alert("Сервер упал. Попробуйте позже"));
				} else {
					nameElement.value = '';
					textElement.value = '';
					return getFetchApi();
				}
			})
			.catch((error) => {
				if (error === "Failed to fetch") {
					preLoaderText.textContent = "";
					alert("Кажется, у вас сломался интернет, попробуйте позже");
				} else {
					console.warn(error);
				}
			})
			.finally(() => {
				buttonElement.disabled = false;
			})
	});
}


const sendFormAuth = () => {
	renderHtmlAuth();
	const loginInputElement = document.getElementById("login");
	const passwordInputElement = document.getElementById("password");
	const buttonElementlogin = document.getElementById("buttonLogin");

	//функция атворизации юзера и сохранение токена по нажатию кнопки --начало
	buttonElementlogin.addEventListener("click", () => {
		loginUser({ loginInputElement, passwordInputElement }).then((responseData) => {
			alert('Авторизация прошла успешно');
			setToken(responseData.user.token);
			setNameUser(responseData.user.name);
			console.log(token);
		}).then(() => {
			ulElement.style.display = "flex";
			document.getElementById("app").remove();
			sendFormComments()
			getFetchApi();
		});
	});
	//функция атворизации юзера и сохранение токена по нажатию кнопки --конец
}

const loginLink = document.getElementById("authorization");
loginLink.addEventListener("click", () => {
	sendFormAuth();
	ulElement.style.display = "none";
	document.getElementById("authorization").remove();
})


