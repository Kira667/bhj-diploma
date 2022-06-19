/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
		if (!element instanceof Element) {
			throw new Error('Переданный элемент в constructor не наследуется от класса Element');
		}

		this.element = element;
		this.registerEvents();
  }
	
  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
		const dataDismissNodes = this.element.querySelectorAll('[data-dismiss=modal]');

		for (const buttonNode of dataDismissNodes) {
			buttonNode.addEventListener('click', (e) => {
				this.onClose(e);
			});
		}
		
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
		this.close();
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
		this.element.classList.add('modal_active');
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
		this.element.classList.remove('modal_active');
  }
}

// class Test {
// 	constructor(element) {
// 		console.log(element);
// 	}
// }

// const elements = document.querySelectorAll('.modal');

// // console.log(elements[3]);
// for (let i = 0; i < elements.length; i++) {
// 	new Test(elements[i]);
// }
