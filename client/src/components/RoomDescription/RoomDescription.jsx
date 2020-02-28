// module
import React from "react";
import { useSelector } from "react-redux";

// styling
import "./roomdescription.scss";

const RoomDescription = () => {
  const {
    room_id,
    coordinates,
    title,
    description,
    players,
    items
  } = useSelector(state => state);
  return (
    <div className="roomdescription-container">
      <div className="room-coordinate">
        <h3>Room {room_id}</h3>
        <span>{coordinates}</span>
      </div>

      <div className="room-description">
        <h4>{title}</h4>
        <p>{description}</p>
        <br />
        <h4>Items</h4>
        {items.length > 0 ? (
          items.map(item => <p>{item}</p>)
        ) : (
          <p>There are no items in this room.</p>
        )}
        <br />
        <h4>Players</h4>
        <p>Player count: {players.length}</p>
      </div>
    </div>
  );
};

export default RoomDescription;
