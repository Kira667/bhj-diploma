/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
		const instanceRegisterModal = App.getModal('register');

		User.register(data, (err, dataRes) => {
			if (dataRes.success === true) {
				this.element.reset();
				App.setState('user-logged');
				instanceRegisterModal.close();
			}
		});
  }
}