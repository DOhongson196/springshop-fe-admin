
import ManufacturerService from "../../services/manufacturerService";
import { COMMON_ERROR_SET, COMMON_LOADING_SET, COMMON_MESSEAGE_SET, MANUFACTURERS_SET, MANUFACTURER_APPEND, MANUFACTURER_DELETE, MANUFACTURER_SET, MANUFACTURER_SET_PAGEABLE, MANUFACTURER_UPDATE } from "./actionTypes";


export const insertManufacturer = (manufacturer) => async (dispatch) =>{
    const service = new ManufacturerService();

    try {
        console.log("insert manufacturer");
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        })
        
        const response = await service.insertManufacturer(manufacturer);

        if(response.status === 201){
            dispatch({
                type: MANUFACTURER_SET,
                payload: response.data,
            })
            dispatch({
                type: MANUFACTURER_APPEND,
                payload: response.data,
            })
            dispatch({
                type: COMMON_MESSEAGE_SET,
                payload: "manufacturer is saved",
            })
        }else{
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            })
        }

        console.log(response);
    } catch (error) {
        console.log("Error" + error);
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        })
    }

    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    })
}

export const updateManufacturer = (id,manufacturer) => async (dispatch) =>{
    const service = new ManufacturerService();

    try {
        console.log("update manufacturer");
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        })
        
        const response = await service.updateManufacturer(id,manufacturer);

        if(response.status === 201){
            dispatch({
                type: MANUFACTURER_SET,
                payload: response.data,
            })
            dispatch({
                type: MANUFACTURER_UPDATE,
                payload: response.data,
            })
            dispatch({
                type: COMMON_MESSEAGE_SET,
                payload: "manufacturer is update",
            })
        }else{
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            })
        }

        console.log(response);
    } catch (error) {
        console.log("Error" + error);
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        })
    }

    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    })
}

export const getManufacturers = () => async (dispatch) => {
    const service = new ManufacturerService();

    try {
        console.log('get Manufacturers');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        })

        const response = await service.getManufacturers();

        console.log(response);

        if(response.status === 200) {
            dispatch({
                type: MANUFACTURERS_SET,
                payload: response.data
            })
        }else{
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            })
        }
    } catch (error) {
        console.log("Error" + error);
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        })
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    })
}

export const getManufacturersByName = (params) => async (dispatch) => {
    const service = new ManufacturerService();

    try {
        console.log('get Manufacturers');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        })

        const response = await service.getManufacturersByName(params);

        console.log(response);

        if(response.status === 200) {
            dispatch({
                type: MANUFACTURERS_SET,
                payload: response.data.content,
            })
            const {size,totalPages,totalElements,pageable} = response.data;
            const pagination = {
                size: size,
                page: pageable.pageNumber,
                query: params.query,
                totalPages: totalPages,
                totalElements: totalElements
            }
            dispatch({
                type: MANUFACTURER_SET_PAGEABLE,
                payload: pagination,
            })
        }else{
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            })
        }
    } catch (error) {
        console.log("Error" + error);
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        })
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    })
}

export const getManufacturer = (id) => async (dispatch) => {
    const service = new ManufacturerService();

    try {
        console.log('get Manufacturers');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        })

        const response = await service.getManufacturer(id);

        console.log(response);

        if(response.status === 200) {
            dispatch({
                type: MANUFACTURER_SET,
                payload: response.data
            })
        }else{
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            })
        }
    } catch (error) {
        console.log("Error" + error);
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        })
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    })
}

export const deleteManufacturer = (id) => async (dispatch) => {
    const service = new ManufacturerService();

    try {
        console.log('delete manufacturer');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        })

        const response = await service.deleteManufacturer(id);

        console.log(response);

        if(response.status === 200) {
            dispatch({
                type: MANUFACTURER_DELETE,
                payload: id
            })
            dispatch({
                type: COMMON_MESSEAGE_SET,
                payload: response.data,
            })
        }else{
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            })
        }
    } catch (error) {
        console.log("Error" + error);
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        })
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    })
}