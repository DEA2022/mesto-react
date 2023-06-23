import React from 'react';
import '../index.css'
import Header from './Header.js';
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({
    name: '',
    link: '',
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [cardIdDelete, setCardIdDelete] = React.useState('')


  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setCards(initialCards)
        setCurrentUser(userInfo)
      })
      .catch(errorMessage => {
        console.error(`Операция не выполнена ${errorMessage}`)
      })
  }, [])


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
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({
      name: '',
      link: ''
    });
  }

  function closePopupsByClickOverlay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function setStateCards(id, newCard) {
    setCards((state) => state.map((card) => (card._id === id ? newCard : card)));
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setStateCards(card._id, newCard);
        })
        .catch(errorMessage => {
          console.error(`Операция не выполнена ${errorMessage}`)
        })
    } else {
      api
        .addLike(card._id)
        .then((newCard) => {
          setStateCards(card._id, newCard);
        })
        .catch(errorMessage => {
          console.error(`Операция не выполнена ${errorMessage}`)
        })
    }
  };

  function handleCardDelete(cardId) {
    setCardIdDelete(cardId)
    setIsDeleteCardPopupOpen(true);
  }

  function handleSubmitCardDelete(event) {
    event.preventDefault();
    api
      .deleteCard(cardIdDelete)
      .then(() => {
        setCards((cards) => cards.filter(item => {
          return item._id !== cardIdDelete;
        }));
        closeAllPopups()
      })
      .catch(errorMessage => {
        console.error(`Операция не выполнена ${errorMessage}`)
      })
  };

  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(errorMessage => {
        console.error(`Операция не выполнена ${errorMessage}`)
      })
  }

  function handleUpdateAvatar(userInfo) {
    api.updateUserAvatar(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(errorMessage => {
        console.error(`Операция не выполнена ${errorMessage}`)
      })
  }

  function handleAddPlace(data) {
    api.createNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(errorMessage => {
        console.error(`Операция не выполнена ${errorMessage}`)
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onDelete={handleCardDelete}
          cards={cards}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onCloseByOverlay={closePopupsByClickOverlay}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onCloseByOverlay={closePopupsByClickOverlay}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name='delete'
          title='Вы уверены'
          textButton='Да'
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onCloseByOverlay={closePopupsByClickOverlay}
          onSubmit={handleSubmitCardDelete}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCloseByOverlay={closePopupsByClickOverlay}
          onAddPlace={handleAddPlace}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onCloseByOverlay={closePopupsByClickOverlay} />
      </div>
    </CurrentUserContext.Provider>

  );
}


export default App;
