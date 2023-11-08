export const sentComment = (buttonElement, preLoaderText) => {
	preLoaderText.textContent = "Ваш комментарий добавляется. Подождите ...";
	buttonElement.disabled = true;
}