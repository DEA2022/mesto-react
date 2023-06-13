import React from 'react';
import { api } from '../utils/api.js';
import Card from './Card.js';


function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick }) {

  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);


  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about)
        setUserAvatar(userInfo.avatar)
        setCards(initialCards)
      })
      .catch(errorMessage => {
        console.error(`Операция не выполнена ${errorMessage}`)
      })
  }, [])

  return (
    <main className="main">
      <section className="profile main__profile">
        <div className="profile__wrapper">
          <button className="profile__button-avatar" type="button" onClick={onEditAvatar}>
            <img className="profile__photo" src={userAvatar} alt="Фото профиля" />
          </button>
          <div className="profile__common">
            <div className="profile__name-content">
              <h1 className="profile__title">{userName}</h1>
              <button className="profile__edit" type="button" onClick={onEditProfile} aria-label="Редактирование профиля">
              </button>
            </div>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button className="profile__button" type="button" onClick={onAddPlace} aria-label="Добавление карточки">
        </button>
      </section>
      <section className="photo page__photo" aria-label="Фото посещенных мест">
        <ul className="photo__grid">
          {cards.map(item => {
            return <Card cardData={item} key={item._id} onCardClick={onCardClick} />
          })}

        </ul>
      </section>
    </main>


  );
}

export default Main;