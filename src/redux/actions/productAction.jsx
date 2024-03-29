
import ProductService from "../../services/productService";
import { COMMON_ERROR_SET, COMMON_LOADING_SET, COMMON_MESSEAGE_SET, PRODUCT_SET } from "./actionTypes";

export const insertProduct = (product,navigate) => async (dispatch) =>{
    const service = new ProductService();

    try {
        console.log("Insert product");
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        })
        
        const response = await service.insertProduct(product);

        if(response.status === 201){
            dispatch({
                type: PRODUCT_SET,
                payload: response.data,
            })
            // dispatch({
            //     type: PRODUCT_APPEND,
            //     payload: response.data,
            // })
            dispatch({
                type: COMMON_MESSEAGE_SET,
                payload: "Product is saved",
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
    navigate("/products/list")
}
