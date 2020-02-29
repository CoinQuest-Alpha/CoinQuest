// modules
import React from "react";
import { Trash, DollarSign } from "react-feather";
import { useDispatch } from "react-redux";

// styling
import "./buttondropsell.scss";

// utils
import instance from "../../utils/instance";

// variables
import {
  DROP_START,
  DROP_SUCCESS,
  DROP_FAILURE,
  SELL_START,
  SELL_SUCCESS,
  SELL_FAILURE
} from "../../reducer/rootReducer";

const ButtonDropSell = ({ item }) => {
  const dispatch = useDispatch();

  const drop = item => {
    const itemToDrop = {
      name: item
    };
    dispatch({ type: DROP_START });
    instance
      .post("api/adv/drop/", itemToDrop)
      .then(res => {
        console.log("Dropped Item: ", res.data);
        dispatch({ type: DROP_SUCCESS, payload: res.data, item });
      })
      .catch(err => dispatch({ type: DROP_FAILURE, payload: err.message }));
  };

  const sell = item => {
    const itemToSell = {
      name: item,
      confirm: "yes"
    };
    dispatch({ type: SELL_START });
    instance
      .post("api/adv/sell/", itemToSell)
      .then(res => {
        console.log("Sold items: ", res.data);
        dispatch({ type: SELL_SUCCESS, payload: res.data, item });
      })
      .catch(err => dispatch({ type: SELL_FAILURE, payload: err.message }));
  };
  return (
    <div className="item-container">
      <h4>{item}</h4>
      <div className="options-for-item">
        <div onClick={() => drop(item)} className="option">
          Drop <Trash />
        </div>
        <div onClick={() => sell(item)} className="option">
          Sell <DollarSign />
        </div>
      </div>
    </div>
  );
};

export default ButtonDropSell;
