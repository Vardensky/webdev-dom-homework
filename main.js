import { getApi } from "./modules/apiData.js";
import { postApi } from "./modules/apiData.js";
import { getCorrectDate } from "./modules/dateFunctions.js";
import { renderData } from "./modules/renderData.js";
import { checkForms } from "./modules/checkForms.js";
import {
	nameElement,
	textElement,
	buttonElement,
	ulElement,
	preLoaderText
} from "./modules/varibales.js";
import { sentComment } from "./modules/sentComment.js";


let commentsArray = [];

preLoaderText.textContent = "Загрузка комментариев ...";
const getFetchApi = () => {
	getApi()
		.then((response) => {
			const getApiComments = response.comments.map((comment) => {
				return {
					author: comment.author.name,
					date: getCorrectDate(comment.date),
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

checkForms(buttonElement, textElement, nameElement);

buttonElement.addEventListener('click', () => {
	//Отправляю комментарий
	sentComment(buttonElement, preLoaderText);
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
