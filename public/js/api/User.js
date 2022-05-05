
/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static path = '/user';
	static URL = `http://localhost:8000${this.path}`;
	static keyLocalStorage = 'user';

  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem(User.keyLocalStorage, JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
		localStorage.removeItem(User.keyLocalStorage);

  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
		const localStorageVal = localStorage.getItem(User.keyLocalStorage);

		if (localStorageVal === null) {
			return undefined;
		}

		const user = JSON.parse(localStorageVal);

		if (Object.prototype.toString.call(user) === '[object Object]') {
			return user;
		} else {
			return undefined;
		}
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
		createRequest({
			url: User.URL + '/current',
			method: 'GET',
			responseType: 'json',
			callback: (err, response) => {
				response.json()
				.then(dataRes => {
					if (dataRes.success === false) { // Если пользователь не авторизован
						callback(err, { success: false, error: 'Необходима авторизация' });
						User.unsetCurrent();
					} else {
						callback(err, dataRes);
						User.setCurrent(dataRes.user);
					}
				});
			}
		});
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: User.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data: data,
      callback: (err, response) => {
				response.json()
				.then(dataRes => {
					
					if (dataRes.success === true) {
						callback(err, dataRes);
					} else {
						callback(err, dataRes);
					}
				})
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
		createRequest({
			url: User.URL + '/register',
			method: 'POST',
			responseType: 'json',
			data: data,
			callback: (err, response) => {
				response.json()
				.then(dataRes => {
					if (dataRes.success === true) {
						User.setCurrent(dataRes.user);
						callback(err, dataRes);
					} else {
						callback(err, dataRes);
					}
				});
			}
		});
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
		createRequest({
			url: User.URL + '/logout',
			method: 'POST',
			responseType: 'json',
			callback: (err, response) => {
				response.json()
				.then(dataRes => {
					if (dataRes.success === true) {
						callback(err, dataRes);
						User.unsetCurrent();
					} else {
						callback(err, dataRes);
					}
				})
			}
		})
  }
}

// const data = {
//   email: 'test@test.ru',
//   password: 'abracadabra'
// }

User.logout((err, response) => {
	
});