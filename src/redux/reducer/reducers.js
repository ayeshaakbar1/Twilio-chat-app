const initialInput = {
  messages: [],
  email: null,
  room: null,
  token: null,
};

const chatReducers = (state = initialInput, action) => {
  switch (action.type) {
    case "ADD_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "DELETE_EMAIL":
      return {
        ...state,
        email: null,
      };

    case "ADD_ROOM":
      return {
        ...state,
        room: action.payload,
      };
    case "DELETE_ROOM":
      return {
        ...state,
        room: null,
      };

    case "ADD_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "DELETE_TOKEN":
      return {
        ...state,
        token: null,
      };
    case "ADD_MESSAGES":
      return {
        ...state,
        messages: action.payload,
      };

      case "SET_MESSAGES":
        return {
          ...state,
          messages: action.payload,
        };
  
    default:
      return state;
  }
};

export default chatReducers;
