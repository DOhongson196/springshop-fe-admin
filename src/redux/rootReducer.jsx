import { combineReducers } from "redux";
import categoryReducer from "./reducers/categoryReducer";
import commonReducer from "./reducers/commonReducer";
import manufacturerReducer from "./reducers/manufacturerReducer";


const rootReducer = combineReducers({
    categoryReducer: categoryReducer,
    commonReducer: commonReducer,
    manufacturerReducer: manufacturerReducer,
})

export default rootReducer;