/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
	static path = '/account';
	static URL = `http://localhost:8000${User.path}`;
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback) {
    createRequest({
      url: `${Account.URL}/${id}`,
      method: 'GET',
      callback: callback
    });
  }
}
