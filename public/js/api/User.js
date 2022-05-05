/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static path = '/user';
	static URL = `http://localhost:8000${User.path}`;
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
		const user = JSON.parse(localStorage.getItem(User.keyLocalStorage));

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
				.then(data => {
					if (data.success === false) { // Если пользователь не авторизован
						callback({
							success: false,
							error: 'Необходима авторизация'
						}, { success: false, user: undefined });
						User.unsetCurrent();
					} else {
						callback(null, { succes: true, user: data.user});
						User.setCurrent(data.user);
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
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
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
				console.log(response);
				response.json()
				.then(dataRes => {
					console.log(dataRes);
				});
			}
		});
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {

  }
}

// const data = {
//   name: 'Vlad',
//   email: 'test@test123.ru',
//   password: 'abracadabra'
// };

// User.register( data, ( err, response ) => {
//   console.log( response );
// });
