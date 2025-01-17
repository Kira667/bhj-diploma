/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/transaction'
 * */
class Transaction extends Entity {
	static path = '/transaction';
	static URL = `http://localhost:8000${this.path}`;
}

