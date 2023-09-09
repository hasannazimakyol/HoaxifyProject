import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';
<<<<<<< HEAD
=======
import { setAuthorizationHeader } from '../api/apiCalls';
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35

const secureLs = new SecureLS();

const getStateFromStorage = () =>{
    const hoaxAuth = secureLs.get('hoax-auth');
    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined
    }
    if (hoaxAuth) {
        return hoaxAuth;
    }
    return stateInLocalStorage;
}

const updateStateInStorage = (newState) => {
    secureLs.set('hoax-auth', newState);
}

const configureStore = () => {
<<<<<<< HEAD
=======
    const initialState = getStateFromStorage();
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(authReducer, getStateFromStorage(), composeEnhancers(applyMiddleware(thunk)));

    store.subscribe(() => {
        updateStateInStorage(store.getState());
<<<<<<< HEAD
    })

=======
        setAuthorizationHeader(store.getState());
    })
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
    return store;
}

export default configureStore;