export const getFetchApi = () => {
	return fetch(
		"https://wedev-api.sky.pro/api/v1/dmitriev-denis/comments",
		{
			method: "GET",
		}
	)
		.then((response) => {
			return response.json();
		})
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
			renderComments();
		})
		.then((response) => {
			preLoaderText.textContent = "";
			preLoaderText.classList.remove("margin");
		});
};

export const getPostApi = () => {
	fetch("https://wedev-api.sky.pro/api/v1/dmitriev-denis/comments", {
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
	})
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
}
