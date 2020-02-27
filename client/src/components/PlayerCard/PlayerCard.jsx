import React from "react";

import "./playerCard.scss";

const PlayerCard = props => {
  return (
    <div className="playercard-container">
      <div className="name-cash">
        <h3>Pirate Ry</h3>
        <span>$185601</span>
      </div>

      <div clasName="stats">
        <p>Encumbrance: 1</p>
        <p>Strength: 10</p>
        <p>Speed: 10</p>
        <p>Inventory: Flower</p>
      </div>

      <div className="effects">
        <p>You have flown south. Flight Bonus: -10% CD</p>
        <p>Wise Explorer: -50% CD </p>
      </div>
    </div>
  );
};

export default PlayerCard;
