import { getApi } from "./modules/apiData.js";
import { postApi } from "./modules/apiData.js";
import { getCorrectDate} from "./modules/dateFunctions.js";
import { renderData} from "./modules/renderData.js";

const nameElement = document.getElementById("inputName");
const textElement = document.getElementById("inputText");
const buttonElement = document.getElementById("buttonPush");
const ulElement = document.getElementById("ul");
const preLoaderText = document.getElementById("pre-loader");

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
			renderData(ulElement, commentsArray);
		})
		.then((response) => {
			preLoaderText.textContent = "";
			preLoaderText.classList.remove("margin");
		});
};

getFetchApi();

// pltcm ,skj
//renderData(ulElement, commentsArray);

buttonElement.disabled = true;
nameElement.addEventListener('input', () => {
	if ((nameElement.value === '') || (textElement.value === '')) {
		buttonElement.disabled = true;
		return;
	}
	else {
		buttonElement.disabled = false;
		return;
	}
});

textElement.addEventListener('input', () => {
	if ((textElement.value === '') || (nameElement.value === '')) {
		buttonElement.disabled = true;
		return;
	}
	else {
		buttonElement.disabled = false;
		return;
	}
})


buttonElement.addEventListener('click', () => {
	nameElement.classList.remove('error');
	textElement.classList.remove('error');

	if ((nameElement.value || textElement.value) === '') {
		nameElement.classList.add('error');
		textElement.classList.add('error');
		return;
	}
	getCorrectDate();

	//Отправляю комментарий
	preLoaderText.textContent = "Ваш комментарий добавляется. Подождите ...";
	buttonElement.disabled = true;
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
