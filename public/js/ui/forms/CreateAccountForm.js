/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
		const instanceCreateAcountModal = App.getModal('createAccount');

		Account.create(data, (err, dataRes) => {
			if (err === null) {
				instanceCreateAcountModal.close();
				App.update();
				this.element.reset();
			}  
		});
  }
}