export const addEmail = (payload) => {
  return {
    type: "ADD_EMAIL",
    payload,
  };
};
export const deleteEmail = () => {
  return {
    type: "DELETE_EMAIL",
  };
};
export const addRoom = (payload) => {
  return {
    type: "ADD_ROOM",
    payload,
  };
};
export const deleteRoom = () => {
  return {
    type: "DELETE_ROOM",
  };
};
export const addToken = (payload) => {
  return {
    type: "ADD_TOKEN",
    payload,
  };
};
export const deleteToken = () => {
  return {
    type: "DELETE_TOKEN",
  };
};
export const addMessages = (payload) => {
  return {
    type: "ADD_MESSAGES",
    payload,
  };
};
export const setMessages = (payload) => {
  return {
    type: "SET_MESSAGES",
    payload,
  };
};
