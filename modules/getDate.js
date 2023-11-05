	//Получаю текущую дату
	export const getCurrentDate = () => {
		let dateOne = new Date().toLocaleString().slice(0, -3).slice(0, 10);
		let dateTwo = new Date().toLocaleString().slice(11).slice(0, -3);
		return dateOne + dateTwo;
	}

	//Получаю скорректированную дату
	export const getCorrectDate = (setDate) => {
		let dateOne = new Date(setDate).toLocaleString().slice(0, -3).slice(0, 10);
		let dateTwo = new Date(setDate).toLocaleString().slice(11).slice(0, -3);
		return dateOne + dateTwo;
	}