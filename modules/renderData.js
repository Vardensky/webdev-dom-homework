export const renderData = (ulElement, commentsArray) => {
	const renderComments = () => {
		return (ulElement.innerHTML = commentsArray
			.map((item, index) => {
				return ` <li class="comment">
          <div class="comment-header">
            <div>${item.author}</div>
            <div>${item.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${item.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${item.likes}</span>
              <button data-index='${index}' class="like-button ${item.paint}"</button>
            </div>
          </div>
        </li>
    `})
			.join(''));
	};

	//реализую анимацию лайка
	const delay = (interval = 300) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, interval);
		})
	}

	const likes = () => {
		const likeButtons = document.querySelectorAll('.like-button');
		for (const likeButton of likeButtons) {
			likeButton.addEventListener('click', (event) => {
				event.stopPropagation();
				likeButton.classList.add("loadingLike");
				delay(2000)
					.then(() => {
						likeButton.classList.remove("loadingLike");
						const index = likeButton.dataset.index;
						if (commentsArray[index].isLiked === false) {
							commentsArray[index].paint = '-active-like';
							commentsArray[index].likes += 1;
							commentsArray[index].isLiked = true;
						} else {
							commentsArray[index].paint = '';
							commentsArray[index].likes -= 1;
							commentsArray[index].isLiked = false;
						}
						renderComments();
						likes();
					})
			});
		};
	};
	renderComments();
	likes();
}

// рендер страницы авторизации -- начало
export const renderHtmlAuth = () => {
	const appElement = document.getElementById('app');
	const loginHtml = `
		<div class="container">
		<div class="add-form-login">
			<input id="login" type="text" class="add-form-name-login" placeholder="Введите логин" value="admin" />
			<input id="password" type="password" class="add-form-name-login" placeholder="Введите пароль" value="admin" />
			<div class="add-form-row">
				<button id="buttonLogin" class="add-form-button-login">Написать</button>
			</div>
		</div>
	</div>
		`;
	appElement.innerHTML = loginHtml;

}
// рендер страницы авторизации -- конец

export const renderHtmlFormComments = () => {
	const formElement = document.getElementById('form-comments');
	const formHtml = `
		<div class="add-form">
		<input id="inputName" type="text" class="add-form-name" placeholder="${nameUser}" readonly/>
		<textarea id="inputText" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
			rows="4"></textarea>
		<div class="add-form-row">
			<button id="buttonPush" class="add-form-button">Написать</button>
		</div>
		`
	formElement.innerHTML = formHtml;
}

//Функция переопределения токена после импорта из модуля -- начало
export let token;
export const setToken = (newToken) => {
	token = newToken;
}
//Функция переопределения токена после импорта из модуля -- конец

//Функция переопределения токена после импорта из модуля -- начало
export let nameUser;
export const setNameUser = (newUser) => {
	nameUser = newUser;
}
			//Функция переопределения токена после импорта из модуля -- конец