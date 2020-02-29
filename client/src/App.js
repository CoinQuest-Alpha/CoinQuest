// modules
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

// components
import Maze from "./components/Maze/Maze";
import Navigation from "./components/Navigation/Navigation";
import Controller from "./components/Controller/Controller";
import PlayerCard from "./components/PlayerCard/PlayerCard";
import RoomDescription from "./components/RoomDescription/RoomDescription";
import instance from "./utils/instance";

// styling
import "./App.scss";

// variables
import {
  ROOM_FETCH_START,
  ROOM_FETCH_SUCCESS,
  ROOM_FETCH_FAILURE,
  PLAYER_FETCH_START,
  PLAYER_FETCH_SUCCESS,
  PLAYER_FETCH_FAILURE
} from "./reducer/rootReducer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ROOM_FETCH_START });
    dispatch({ type: PLAYER_FETCH_START });
    instance
      .get("api/adv/init/")
      .then(res => {
        dispatch({ type: ROOM_FETCH_SUCCESS, payload: res.data });
      })
      .catch(err =>
        dispatch({ type: ROOM_FETCH_FAILURE, payload: err.response })
      );
    instance
      .post("api/adv/status/")
      .then(res => {
        dispatch({ type: PLAYER_FETCH_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: PLAYER_FETCH_FAILURE, payload: err.response });
      });
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <Maze />
      <div className="controller-playercard-roomdescription-container">
        <PlayerCard />
        <RoomDescription />
        <Controller />
      </div>
    </div>
  );
}

export default App;
