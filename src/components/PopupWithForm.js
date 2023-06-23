import { useClosePopupsByEsc } from "../utils/useClosePopupByEsc"

function PopupWithForm({
  name,
  title,
  children,
  textButton,
  isOpen,
  onClose,
  onCloseByOverlay,
  onSubmit
}) {
  useClosePopupsByEsc(isOpen, onClose);


  const addClassNamePopup = () => {
    if (name === 'avatar') {
      return 'popup__container popup__container_type_avatar'
    }
    if (name === 'delete') {
      return 'popup__container popup__container_type_agreement'
    }
    else {
      return 'popup__container'
    }
  }

  const addClassNameTitle = () => {
    if (name === 'delete') {
      return 'popup__title popup__title_type_agreement'
    }
    else {
      return 'popup__title'
    }
  }

  return (
    <div className={`popup popup_type_${name}` + (isOpen && ' popup_opened')} onClick={onCloseByOverlay}>
      <div className={addClassNamePopup()}>
        <h2 className={addClassNameTitle()}>{title}</h2>
        <form action="#" className="form" name={name} onSubmit={onSubmit} noValidate>

          {children}

          <button className="form__submit" type="submit" aria-label={textButton}>{textButton}</button>
        </form>
        <button className="popup__close popup__close_el_profile" type="button" aria-label="Закрыть" onClick={onClose}>
        </button>
      </div>
    </div>
  );
}


export default PopupWithForm;