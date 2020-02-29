// module
import React from "react";
import { useSelector, useDispatch } from "react-redux";

// styling
import "./roomdescription.scss";

// utils
import instance from "../../utils/instance";

// variables
import {
  EXAMINE_START,
  EXAMINE_SUCCESS,
  EXAMINE_FAILURE,
  PICKUP_START,
  PICKUP_SUCCESS,
  PICKUP_FAILURE
} from "../../reducer/rootReducer";

const RoomDescription = () => {
  const {
    room_id,
    coordinates,
    title,
    description,
    players,
    items
  } = useSelector(state => state);

  const dispatch = useDispatch();

  const examine = itemOrPlayer => {
    const examinedItemOrPlayer = {
      name: itemOrPlayer
    };
    dispatch({ type: EXAMINE_START });
    instance
      .post("api/adv/examine", examinedItemOrPlayer)
      .then(res => {
        console.log("Examined Item/Player: ", res.data);
        dispatch({ type: EXAMINE_SUCCESS, payload: res.data });
      })
      .catch(err => dispatch({ type: EXAMINE_FAILURE, payload: err.message }));
  };

  const pickup = item => {
    const itemToPickup = {
      name: item
    };
    dispatch({ type: PICKUP_START });
    instance
      .post("api/adv/take/", itemToPickup)
      .then(res => {
        console.log("Picked Up Item: ", res.data);
        dispatch({ type: PICKUP_SUCCESS, payload: res.data, item });
      })
      .catch(err => dispatch({ type: PICKUP_FAILURE, payload: err.message }));
  };

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
          items.map(item => (
            <p style={{ cursor: "pointer" }} onClick={() => pickup(item)}>
              {item}
            </p>
          ))
        ) : (
          <p>There are no items in this room.</p>
        )}
        <br />
        <h4>Players</h4>
        <div className="players-list">
          {players.length > 0 ? (
            players.map(player => (
              <p className="player" onClick={() => examine(player)}>
                {player}&nbsp;
              </p>
            ))
          ) : (
            <p>There are no players in this room.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDescription;
