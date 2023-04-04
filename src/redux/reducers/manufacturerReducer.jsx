import { MANUFACTURERS_SET, MANUFACTURER_APPEND, MANUFACTURER_DELETE, MANUFACTURER_SET, MANUFACTURER_SET_PAGEABLE, MANUFACTURER_UPDATE } from "../actions/actionTypes"

const initialState = {
    manufacturer: {},
    manufacturers: [],
    pagination: {
        size: 5,
        page: 0,
        totalElements: 0,
        query: '',
        totalPages: 1
    }
}

const manufacturerReducer = (state = initialState,{type, payload}) =>{
    switch(type){
        case MANUFACTURER_SET :
            return {...state,manufacturer:payload}
        case MANUFACTURERS_SET :
            return {...state,manufacturers:payload} 
        case MANUFACTURER_APPEND :
            return {...state,manufacturers: [payload,...state.manufacturers]}
        case MANUFACTURER_SET_PAGEABLE :
            return {...state,pagination: payload} 
        case MANUFACTURER_DELETE:
            return {
                ...state,
                manufacturers: state.manufacturers.filter((item) =>
                item.id !== payload
                )
            } 
        case MANUFACTURER_UPDATE:
            const newManufacturers = state.manufacturer.filter((item) => item.id !== payload.id)
            return {
                ...state,
                manufacturers: [payload,...newManufacturers]
            } 
        default:
            return state
    }
}

export default manufacturerReducer