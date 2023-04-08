import { combineReducers } from "redux";
import categoryReducer from "./reducers/categoryReducer";
import commonReducer from "./reducers/commonReducer";
import productReducer from "./reducers/productReducer";
import manufacturerReducer from "./reducers/manufacturerReducer";


const rootReducer = combineReducers({
    categoryReducer: categoryReducer,
    commonReducer,
    manufacturerReducer,
    productReducer,
})

export default rootReducer;