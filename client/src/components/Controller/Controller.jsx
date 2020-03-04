// modules
import React, { useEffect } from "react";
// import { DollarSign, Search, ShoppingBag } from "react-feather";
import { useDispatch, useSelector } from "react-redux";

// utils
import instance from "../../utils/instance";
import Stack from "../../utils/stack";

// styling
import "./controller.scss";

// variables
import {
  MOVEMENT_START,
  MOVEMENT_SUCCESS,
  MOVEMENT_FAILURE,
  COUNT_DECREMENT
} from "../../reducer/rootReducer";

const Controller = () => {
  const dispatch = useDispatch();
  const cooldown = useSelector(state => state.cooldown);
  const exits = useSelector(state => state.exits);
  const terrain = useSelector(state => state.terrain);

  const move = direction => {
    dispatch({ type: MOVEMENT_START });
    let movement = "";
    if (terrain === "CAVE") {
      movement = "move";
    }
    if (terrain === "MOUNTAIN" || terrain === "NORMAL" || terrain === "TRAP") {
      movement = "fly";
    }
    instance
      .post(`api/adv/${movement}/`, direction)
      .then(res => {
        if (res.data.cooldown % 1 !== 0) {
          res.data.cooldown += 0.5;
        }
        dispatch({ type: MOVEMENT_SUCCESS, payload: res.data });
        console.log(res.data);
      })
      .catch(err => dispatch({ type: MOVEMENT_FAILURE, payload: err }));
  };

  useEffect(() => {
    if (cooldown > 0) {
      setTimeout(() => {
        dispatch({ type: COUNT_DECREMENT });
      }, 1000);
    }
  }, [cooldown, dispatch]);

  /* 
    maze: {
      0: {n: '0', s: '?', e: '?', w: '?'},
      10: {n: '?', s: 0, e: '?', w: '?'}
    }
  */
  // useEffect(() => {
  //   const trace_back = new Stack();
  //   trace_back.append(0);
  //   const visited = new Set();
  //   let maze = {}
  //   let not_visited = [];
  //   let direction = "";
  //   let current_room = 0;
  //   let last_room = 0;
  //   // init call
  //   // room id: 0
  //   // exits: ['n', 's', 'e', 'w']
  //   if (maze.hasOwnProperty(room_id)){
  //     // do something
  //   } else {
  //     trace_back.push(room_id); // adds 0 to the stack
  //     visited.add(room_id); // adds 0 to the Set
  //     // This will create a new key:value of room_id with their exits as '?'
  //     if (exits.length <= 1){
  //       //
  //     } else {
  //       for (let i = 0; i < exits.length; i++){
  //         maze.room_id[exits[i]] = '?';
  //         not_visited.push(exits[i]) // n, s, e, w
  //         direction = not_visited[0];
  //         last_room = room_id;
  //         move(direction);
  //       }
  //     }
  //   }

  // checks and sees if the maze object has this particular key ie room number already stored
  // if (maze.hasOwnProperty(room_id)){
  //   // since it does have this key, now we're going to check which one has a '?' and which one already has a value
  //   for (let [key, value] of Object.entries(maze[room_id])){
  //     if (value === "?") { not_visited.push(key) }
  //   }
  //   if (not_visited.length > 0){
  //     next_move = not_visited[0];
  //   }
  // Still in progress
  // } else {
  //   stack.append(room_id);
  //   visited.add(room_id);
  //   exits.forEach(el => {
  //     maze[room_id] = {...maze[room_id], [el]: '?'}
  //     next_move = el;
  //   })

  // }

  // }, [])

  return (
    <div className="controller-container">
      <h2>
        Cooldown: <span>{cooldown}</span>
      </h2>
      <p>Available directions: {exits.map(ea => ea.toUpperCase())}</p>
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
      {/* <div className="actions">
        <DollarSign />
        <Search />
        <ShoppingBag />
      </div> */}
    </div>
  );
};

export default Controller;
