// modules
import React from "react";
import { useSelector } from "react-redux";

// styling
import "./playerCard.scss";

// components
import ButtonDropSell from "../ButtonDropSell/ButtonDropSell";

const PlayerCard = () => {
  const {
    name,
    gold,
    encumbrance,
    strength,
    speed,
    inventory,
    messages
  } = useSelector(state => state);

  return (
    <div className="playercard-container">
      <div className="name-cash">
        <h3>{name}</h3>
        <span>${gold}</span>
      </div>

      <div className="stats">
        <p>Encumbrance: {encumbrance}</p>
        <p>Strength: {strength}</p>
        <p>Speed: {speed}</p>
        <p>Items in Inventory:</p>
        {inventory.length > 0 ? (
          inventory.map((item, i) => <ButtonDropSell key={i} item={item} />)
        ) : (
          <p>There are no items in your inventory.</p>
        )}
      </div>

      <div className="messages">
        {messages.length > 0 ? (
          messages.map(message => <p>{message}</p>)
        ) : (
          <p>No messages.</p>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
