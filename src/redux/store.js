import { createStore, combineReducers } from "redux";
import chatReducers from "./reducer/reducers";

const rootReducers = combineReducers({
  chatReducers,
});
const store = createStore(rootReducers);

export default store;
