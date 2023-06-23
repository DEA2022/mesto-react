import PopupWithForm from "./PopupWithForm"
import React, { useRef } from "react";

function EditAvatarPopup({
  isOpen,
  onClose,
  onCloseByOverlay,
  onUpdateAvatar

}) {

  const avatarRef = useRef();

  function handleSubmitEditAvatar(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      src: avatarRef.current.value,
    });
  }

  return (

    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      textButton='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onCloseByOverlay={onCloseByOverlay}
      onSubmit={handleSubmitEditAvatar}
    >
      <fieldset className="form__info">
        <input
          type="url"
          className="form__field form__field_el_webcite"
          id="form-src"
          name="src"
          placeholder="Ссылка на картинку"
          required
          ref={avatarRef}
        />
        <span className="form__error form-src-error" />
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
