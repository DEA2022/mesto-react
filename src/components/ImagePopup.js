import { useClosePopupsByEsc } from "../utils/useClosePopupByEsc";

function ImagePopup({ card, isOpen, onClose, onCloseByOverlay }) {

useClosePopupsByEsc(!!card.link, onClose);

  return (
    <div className={`popup popup_type_image ${card.link && 'popup_opened'}`}  onClick={onCloseByOverlay}>
      <div className="popup__img-container">
        <figure className="popup__figure">
          <img src={card.link} alt={card.name} className="popup__img" />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
        <button className="popup__close popup__close_el_pic" type="button" aria-label="Закрыть" onClick={onClose}>
        </button>
      </div>
    </div>
  );
}


export default ImagePopup;