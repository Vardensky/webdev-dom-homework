
	let commentsArray = [];


	preLoaderText.textContent = "Загрузка комментариев ...";
	

	getFetchApi();

	renderComments();

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
		getPostApi();
	});

