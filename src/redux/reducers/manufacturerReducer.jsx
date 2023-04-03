import { MANUFACTURERS_SET, MANUFACTURER_APPEND, MANUFACTURER_DELETE, MANUFACTURER_SET } from "../actions/actionTypes"

const initialState = {
    manufacturer: {},
    manufacturers: []
}

const manufacturerReducer = (state = initialState,{type, payload}) =>{
    switch(type){
        case MANUFACTURER_SET :
            return {...state,manufacturer:payload}
        case MANUFACTURERS_SET :
            return {...state,manufacturers:payload} 
        case MANUFACTURER_APPEND :
            return {...state,manufacturers: [payload,...state.manufacturers]} 
        case MANUFACTURER_DELETE:
            return {
                ...state,
                manufacturers: state.manufacturers.filter((item) =>
                item.id !== payload
                )
            } 
        default:
            return state
    }
}

export default manufacturerReducer