import { createStore, combineReducers,applyMiddleware } from "redux";
import {thunk} from 'redux-thunk';
import LoginReducer from "./redux/Reducer/LoginReducer";
import HomeReducer from "./redux/Reducer/HomeReducer";

const rootReducer=combineReducers({
    login:LoginReducer,
    home:HomeReducer
})

const store= createStore(rootReducer,applyMiddleware(thunk))

export default store