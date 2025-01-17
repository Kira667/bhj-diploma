/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
		if (!element instanceof Element) {
			throw new Error('Переданный элемент в constructor не наследуется от класса Element');
		}
		this.element = element;
		this.registerEvents();
  }

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
		this.element.addEventListener('submit', (event) => {
			event.preventDefault();
			this.submit();
		});
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
		const elementFormObj = {};

		for (let i = 0; i < this.element.length; i++) {
			if (!(this.element[i] instanceof HTMLButtonElement)) {
				const name = this.element[i].name;
				const value = this.element[i].value;
				elementFormObj[name] = value;
			}
		}

		

		return elementFormObj;
		// console.log(this.element.length);
		// console.log(this.element.elements);
  }

  onSubmit(options) {

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
		this.onSubmit(this.getData());
  }
}