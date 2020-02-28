// variables
const FETCHING_DATA = "FETCHING_DATA";
const FETCH_COMPLETE = "FETCH_COMPLETE";
const FETCH_FAILURE = "FETCH_FAILURE";
const PLAYER_FETCH_DATA = "PLAYER_FETCH_DATA";
const PLAYER_FETCH_COMPLETE = "PLAYER_FETCH_COMPLETE";
const PLAYER_FETCH_FAILURE = "PLAYER_FETCH_FAILURE";

const initialState = {
  name: "",
  encumbrance: 0,
  strength: 0,
  speed: 0,
  gold: 0,
  bodywear: "",
  footwear: "",
  inventory: [],
  items: [],
  status: [],
  room_id: 0,
  title: "",
  description: "",
  coordinates: "",
  exits: [],
  room_cooldown: 0,
  player_cooldown: 0,
  room_errors: [],
  player_errors: [],
  messages: [],
  players: [],
  room_loading: false,
  player_loading: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        room_loading: true
      };

    case FETCH_COMPLETE:
      return {
        ...state,
        room_id: action.payload.room_id,
        title: action.payload.title,
        description: action.payload.description,
        items: action.payload.items,
        coordinates: action.payload.coordinates,
        exits: action.payload.exits,
        room_cooldown: action.payload.cooldown,
        errors: action.payload.errors,
        messages: action.payload.messages,
        players: action.payload.players,
        room_loading: false
      };

    case FETCH_FAILURE:
      return {
        ...state,
        room_errors: action.payload,
        room_loading: false
      };
    case PLAYER_FETCH_DATA:
      return {
        ...state,
        player_loading: true
      };
    case PLAYER_FETCH_COMPLETE:
      return {
        ...state,
        name: action.payload.name,
        player_cooldown: action.payload.cooldown,
        encumbrance: action.payload.encumbrance,
        strength: action.payload.strength,
        speed: action.payload.speed,
        gold: action.payload.gold,
        bodywear: action.payload.bodywear,
        footwear: action.payload.footwear,
        inventory: action.payload.inventory,
        abilities: action.payload.abilities,
        status: action.payload.status,
        has_mined: action.payload.false,
        messages: action.payload.messages
      };
    case PLAYER_FETCH_FAILURE:
      return {
        ...state,
        player_errors: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default rootReducer;
