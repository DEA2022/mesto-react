import { useClosePopupsByEsc } from "../utils/useClosePopupByEsc"

function PopupWithForm({
  additionalClass,
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


  return (
    <div className={`popup popup_type_${name}` + (isOpen && ' popup_opened')} onClick={onCloseByOverlay}>
      <div className='popup__container'>
        <h2 className={`popup__title ${additionalClass}`}>{title}</h2>
        <form action="#" className="form" name={name} onSubmit={onSubmit} noValidate>

          {children}

          <button className="form__submit" type="submit" aria-label={textButton}>{textButton}</button>
        </form>
        <button className="popup__close popup__close_el_profile" type="button" aria-label="Закрыть" onClick={onClose}>
        </button>
      </div>
    </div >
  );
}


export default PopupWithForm;