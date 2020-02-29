// modules
import React from "react";
import { DollarSign, Search, ShoppingBag } from "react-feather";
import { useDispatch } from "react-redux";

import instance from "../../utils/instance";

// styling
import "./controller.scss";

// variables
import {
  MOVEMENT_START,
  MOVEMENT_SUCCESS,
  MOVEMENT_FAILURE
} from "../../reducer/rootReducer";

const Controller = () => {
  const dispatch = useDispatch();

  const move = direction => {
    dispatch({ type: MOVEMENT_START });
    instance
      .post("api/adv/move/", direction)
      .then(res => {
        console.log("Movement to: ", res.data);
        dispatch({ type: MOVEMENT_SUCCESS, payload: res.data });
      })
      .catch(err => dispatch({ type: MOVEMENT_FAILURE, payload: err }));
  };

  return (
    <div className="controller-container">
      <div className="controller">
        <div className="layer">
          <div className="box" style={{ border: "none" }}></div>
          <div
            className="box"
            style={{ cursor: "pointer" }}
            onClick={() => move({ direction: "n" })}
          >
            ▲
          </div>
          <div className="box" style={{ border: "none" }}></div>
        </div>

        <div className="layer">
          <div
            className="box transform"
            style={{ border: "2px solid black", cursor: "pointer" }}
            onClick={() => move({ direction: "w" })}
          >
            ▼
          </div>
          <div className="box circle" style={{ border: "none" }}>
            ●
          </div>
          <div
            className="box transform"
            style={{ borderTop: "2px solid black", cursor: "pointer" }}
            onClick={() => move({ direction: "e" })}
          >
            ▲
          </div>
        </div>

        <div className="layer">
          <div className="box" style={{ border: "none" }}></div>
          <div
            style={{ cursor: "pointer" }}
            className="box"
            onClick={() => move({ direction: "s" })}
          >
            ▼
          </div>
          <div className="box" style={{ border: "none" }}></div>
        </div>
      </div>
      <div className="actions">
        <DollarSign />
        <Search />
        <ShoppingBag />
      </div>
    </div>
  );
};

export default Controller;
