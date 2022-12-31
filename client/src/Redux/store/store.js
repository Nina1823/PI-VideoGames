import rootReducer from "../reducer/reducer";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose; //para utilizar la herramienta redux dev-tools de los navegadores

const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk)));

export default store;