import {useClosePopupsByEsc} from "../utils/useClosePopupByEsc"

function PopupWithForm({
  name,
  title,
  children,
  textButton,
  isOpen,
  onClose,
  onCloseByOverlay
}) {
  useClosePopupsByEsc(isOpen, onClose);

  const addClassNamePopup = (name === 'avatar')
    ? 'popup__container popup__container_type_avatar'
    : 'popup__container'

  return (
    <div className={`popup popup_type_${name}` + (isOpen && ' popup_opened')} onClick={onCloseByOverlay}>
      <div className={addClassNamePopup}>
        <h2 className="popup__title">{title}</h2>
        <form action="#" className="form" name={name} noValidate>

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