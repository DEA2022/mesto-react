import React from 'react';
import '../index.css'
import Header from './Header.js';
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '',
  });


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({
      name: '',
      link: ''
    });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function closePopupsByClickOverlay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  };


  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}

      />
      <Footer />
      <PopupWithForm
        name='profile'
        title='Редактирование профиля'
        textButton='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onCloseByOverlay={closePopupsByClickOverlay}
      >
        <fieldset className="form__info">
          <input type="text" className="form__field form__field_el_name"
            id="form-name" name="name" placeholder="Введите имя"
            minLength={2} maxLength={40} required />
          <span className="form__error form-name-error" />
          <input type="text" className="form__field form__field_el_job"
            id="form-job" name="job" placeholder="Введите информацию о себе"
            minLength={2} maxLength={200} required />
          <span className="form__error form-job-error" />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name='delete'
        title='Вы уверены'
        textButton='Да'
        onCloseByOverlay={closePopupsByClickOverlay} />

      <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        textButton='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onCloseByOverlay={closePopupsByClickOverlay}
      >
        <fieldset className="form__info">
          <input type="url" className="form__field form__field_el_webcite"
            id="form-src" name="src" placeholder="Ссылка на картинку" required />
          <span className="form__error form-src-error" />
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name='cards'
        title='Новое место'
        textButton='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onCloseByOverlay={closePopupsByClickOverlay}
      >
        <fieldset className="form__info">
          <input type="text" className="form__field form__field_el_place"
            id="form-place" name="place" placeholder="Название"
            minLength={2} maxLength={30} required />
          <span className="form__error form-place-error" />
          <input type="url" className="form__field form__field_el_webcite"
            id="form-url" name="url" placeholder="Ссылка на картинку" required />
          <span className="form__error form-url-error" />
        </fieldset>
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups} 
        onCloseByOverlay={closePopupsByClickOverlay}/>
    </div>
  );
}


export default App;
