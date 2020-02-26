// modules
import React from "react";

// components
import Maze from "./components/Maze/Maze";
import Navigation from "./components/Navigation/Navigation";
import Controller from "./components/Controller/Controller";
import PlayerCard from "./components/PlayerCard/PlayerCard";
import RoomDescription from "./components/RoomDescription/RoomDescription";
import "./App.scss";

function App() {
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
