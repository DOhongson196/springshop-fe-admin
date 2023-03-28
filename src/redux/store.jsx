const { configureStore } = require("@reduxjs/toolkit")
const { default: rootReducer } = require("./rootReducer")

const intialState = {}

function configureAppstore(preLoadedState){
    const store = configureStore({
        reducer: rootReducer,
        preloadedState: preLoadedState
    })

    if(process.env.NODE_ENV !== 'production' && module.hot){
        module.hot.accept("./rootReducer");

        store.replaceReducer(rootReducer);
    }

    return store;
}

export default configureAppstore(intialState);