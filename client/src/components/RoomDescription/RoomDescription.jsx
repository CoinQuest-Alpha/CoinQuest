// module
import React from "react";

// styling
import "./roomdescription.scss";

const RoomDescription = props => {
  return (
    <div className="roomdescription-container">
      <div className="room-coordinate">
        <h3>Room 12</h3>
        <span>(61, 57)</span>
      </div>

      <div className="room-description">
        <h4>Mt. Holloway</h4>
        <p>You are on the side of a steep incline.</p>
        <br />
        <h4>Items</h4>
        <p>There are no items in this room.</p>
        <br />
        <h4>Players</h4>
        <p>There are no players in this room.</p>
      </div>
    </div>
  );
};

export default RoomDescription;
