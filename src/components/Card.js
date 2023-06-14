import React from 'react';

function Card({ cardData, onCardClick }) {


  return (
    <li className="photo__card">
      <img
        className="photo__item"
        src={cardData.link}
        alt={cardData.name}
        onClick={() => onCardClick({ name: cardData.name, link: cardData.link })} />
      <button className="photo__trash" type="button" aria-label="Корзина" />
      <div className="photo__wrap">
        <h2 className="photo__name">{cardData.name}</h2>
        <div className="photo__likes">
          <button className="photo__icon" type="button" aria-label="Лайк" />
          <div className="photo__counter">{cardData.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;