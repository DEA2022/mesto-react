import PopupWithForm from "./PopupWithForm"
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({
  isOpen,
  onClose,
  onCloseByOverlay,
  onUpdateUser
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmitEditProfile(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      job: description,
    });
  }

  return (

    <PopupWithForm
      name='profile'
      title='Редактирование профиля'
      textButton='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onCloseByOverlay={onCloseByOverlay}
      onSubmit={handleSubmitEditProfile}
    >
      <fieldset className="form__info">
        <input
          type="text"
          className="form__field form__field_el_name"
          id="form-name"
          name="name"
          placeholder="Введите имя"
          minLength={2}
          maxLength={40}
          required
          value={name ? name : ''}
          onChange={handleChangeName}
        />
        <span className="form__error form-name-error" />
        <input type="text"
          className="form__field form__field_el_job"
          id="form-job"
          name="job"
          placeholder="Введите информацию о себе"
          minLength={2}
          maxLength={200}
          required
          value={description ? description : ''}
          onChange={handleChangeDescription}
        />
        <span className="form__error form-job-error" />
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup
