import rootReducer from "../reducer/reducer"; //para el create store
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";

//Para que funcione con e Midd las apps ascinronas y funcione redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //para utilizar la herramienta redux dev-tools de los navegadores


const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk)));

export default store;