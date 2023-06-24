import PopupWithForm from "./PopupWithForm"
import { useEffect, useState } from "react"

function AddPlacePopup({
  isOpen,
  onClose,
  onCloseByOverlay,
  onAddPlace
}) {
  const [place, setPlace] = useState('')
  const [url, setUrl] = useState('')

  function handleChangePlace(evt) {
    setPlace(evt.target.value)
  }

  function handleChangeUrl(evt) {
    setUrl(evt.target.value)
  }

  function handleSubmitAddPlace(evt) {
    evt.preventDefault();

    onAddPlace({
      place,
      url
    })
  }

  useEffect(() => {
    setPlace('');
    setUrl('');
  }, [isOpen]);

  return (
    <PopupWithForm
      name='cards'
      title='Новое место'
      textButton='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onCloseByOverlay={onCloseByOverlay}
      onSubmit={handleSubmitAddPlace}
    >
      <fieldset className="form__info">
        <input
          type="text"
          className="form__field form__field_el_place"
          id="form-place"
          name="place"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required
          value={place ? place : ''}
          onChange={handleChangePlace}

        />
        <span className="form__error form-place-error" />
        <input
          type="url"
          className="form__field form__field_el_webcite"
          id="form-url"
          name="url"
          placeholder="Ссылка на картинку"
          required
          value={url ? url : ''}
          onChange={handleChangeUrl}
        />
        <span className="form__error form-url-error" />
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup