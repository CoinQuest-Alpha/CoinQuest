// variables
export const ROOM_FETCH_START = "ROOM_FETCH_START";
export const ROOM_FETCH_SUCCESS = "ROOM_FETCH_SUCCESS";
export const ROOM_FETCH_FAILURE = "ROOM_FETCH_FAILURE";
export const PLAYER_FETCH_START = "PLAYER_FETCH_START";
export const PLAYER_FETCH_SUCCESS = "PLAYER_FETCH_SUCCESS";
export const PLAYER_FETCH_FAILURE = "PLAYER_FETCH_FAILURE";
export const MOVEMENT_START = "MOVEMENT_START";
export const MOVEMENT_SUCCESS = "MOVEMENT_SUCCESS";
export const MOVEMENT_FAILURE = "MOVEMENT_FAILURE";
export const EXAMINE_START = "EXAMINE_START";
export const EXAMINE_SUCCESS = "EXAMINE_SUCCESS";
export const EXAMINE_FAILURE = "EXAMINE_FAILURE";
export const PICKUP_START = "PICKUP_START";
export const PICKUP_SUCCESS = "PICKUP_SUCCESS";
export const PICKUP_FAILURE = "PICKUP_FAILURE";
export const DROP_START = "DROP_START";
export const DROP_SUCCESS = "DROP_SUCCESS";
export const DROP_FAILURE = "DROP_FAILURE";
export const SELL_START = "SELL_START";
export const SELL_SUCCESS = "SELL_SUCCESS";
export const SELL_FAILURE = "SELL_FAILURE";

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
  has_mined: false,
  cooldown: 0,
  room_errors: [],
  player_errors: [],
  examine_errors: [],
  pickup_errors: [],
  drop_errors: [],
  sell_errors: [],
  messages: [],
  players: [],
  room_loading: false,
  player_loading: false,
  movement_loading: false,
  examine_loading: false,
  pickup_loading: false,
  drop_loading: false,
  sell_loading: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROOM_FETCH_START:
      return {
        ...state,
        room_loading: true
      };

    case ROOM_FETCH_SUCCESS:
      return {
        ...state,
        room_id: action.payload.room_id,
        title: action.payload.title,
        description: action.payload.description,
        items: action.payload.items,
        coordinates: action.payload.coordinates,
        exits: action.payload.exits,
        cooldown: action.payload.cooldown,
        errors: action.payload.errors,
        messages: action.payload.messages,
        players: action.payload.players,
        room_loading: false
      };

    case ROOM_FETCH_FAILURE:
      return {
        ...state,
        room_errors: action.payload,
        room_loading: false
      };
    case PLAYER_FETCH_START:
      return {
        ...state,
        player_loading: true
      };
    case PLAYER_FETCH_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        cooldown: action.payload.cooldown,
        encumbrance: action.payload.encumbrance,
        strength: action.payload.strength,
        speed: action.payload.speed,
        gold: action.payload.gold,
        bodywear: action.payload.bodywear,
        footwear: action.payload.footwear,
        inventory: action.payload.inventory,
        abilities: action.payload.abilities,
        status: action.payload.status,
        has_mined: action.payload.has_mined,
        messages: action.payload.messages
      };
    case PLAYER_FETCH_FAILURE:
      return {
        ...state,
        player_errors: action.payload
      };
    case MOVEMENT_START:
      return {
        ...state,
        movement_loading: true
      };
    case MOVEMENT_SUCCESS:
      return {
        ...state,
        room_id: action.payload.room_id,
        title: action.payload.title,
        description: action.payload.description,
        coordinates: action.payload.coordinates,
        exits: action.payload.exits,
        cooldown: action.payload.cooldown,
        messages: action.payload.messages,
        players: action.payload.players,
        items: action.payload.items
      };
    case MOVEMENT_FAILURE:
      return {
        ...state,
        room_errors: action.payload
      };
    case EXAMINE_START:
      return {
        ...state,
        examine_loading: true
      };
    case EXAMINE_SUCCESS:
      return {
        ...state,
        examine_loading: false
      };
    case EXAMINE_FAILURE:
      return {
        ...state,
        examine_loading: false,
        examine_errors: action.payload
      };
    case PICKUP_START:
      return {
        ...state,
        pickup_loading: true
      };
    case PICKUP_SUCCESS:
      return {
        ...state,
        pickup_loading: false,
        inventory: [...state.inventory, action.item],
        items: action.payload.items,
        encumbrance: state.encumbrance + 1
      };
    case PICKUP_FAILURE:
      return {
        ...state,
        pickup_loading: false,
        pickup_errors: action.payload
      };
    case DROP_START:
      return {
        ...state,
        drop_loading: true
      };
    case DROP_SUCCESS:
      return {
        ...state,
        drop_loading: false,
        inventory: state.inventory.filter(item => item !== action.item),
        items: action.payload.items,
        encumbrance: state.encumbrance - 1
      };
    case DROP_FAILURE:
      return {
        ...state,
        drop_loading: false,
        drop_errors: action.payload
      };
    case SELL_START:
      return {
        ...state,
        sell_loading: true
      };
    case SELL_SUCCESS:
      return {
        ...state,
        sell_loading: false,
        inventory: state.inventory.filter(item => item !== action.item),
        encumbrance: state.encumbrance - 1
      };
    case SELL_FAILURE:
      return {
        ...state,
        sell_loading: false,
        sell_errors: action.payload
      };
    default:
      return {
        ...state
      };
  }
};

export default rootReducer;
