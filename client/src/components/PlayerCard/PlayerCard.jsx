// modules
import React from "react";
import { useSelector } from "react-redux";

// styling
import "./playerCard.scss";

const PlayerCard = () => {
  const {
    name,
    gold,
    encumbrance,
    strength,
    speed,
    inventory,
    status
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
        {inventory.length > 0 ? (
          inventory.map(item => <p>{item}</p>)
        ) : (
          <p>Inventory: There are no items in your inventory</p>
        )}
      </div>

      <div className="effects">
        {status.length > 0 ? (
          status.map(effect => <p>{effect}</p>)
        ) : (
          <p>There are no effects.</p>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
