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
const FETCHING_DATA = "FETCHING_DATA";
const FETCH_COMPLETE = "FETCH_COMPLETE";
const FETCH_FAILURE = "FETCH_FAILURE";
const PLAYER_FETCH_DATA = "PLAYER_FETCH_DATA";
const PLAYER_FETCH_COMPLETE = "PLAYER_FETCH_COMPLETE";
const PLAYER_FETCH_FAILURE = "PLAYER_FETCH_FAILURE";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FETCHING_DATA });
    dispatch({ type: PLAYER_FETCH_DATA });
    instance
      .get("api/adv/init/")
      .then(res => {
        dispatch({ type: FETCH_COMPLETE, payload: res.data });
        console.log(res.data);
      })
      .catch(err => dispatch({ type: FETCH_FAILURE, payload: err.response }));
    instance
      .post("api/adv/status/")
      .then(res => {
        dispatch({ type: PLAYER_FETCH_COMPLETE, payload: res.data });
        console.log(res.data);
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
