import CategoryService from "../../services/categoryService";
import { CATEGORIES_SET, CATEGORY_SET, CATEGORY_STATE_CLEAR } from "./actionTypes";

export const insertCategory = (category,navigate) => async (dispatch) =>{
    const service = new CategoryService();

    try {
        console.log("insert Category");
        
        const reponse = await service.insertCategory(category);

        if(reponse.status === 201){
            dispatch({
                type: CATEGORY_SET,
                payload: reponse.data,
            })
        }

        console.log(reponse);
    } catch (error) {
        console.log("Error" +error);
    }
    navigate("/categories/list");
}


export const getCategories = () => async (dispatch) => {
    const service = new CategoryService();

    try {
        console.log('get categories');

        const response = await service.getCategories();

        console.log(response);

        if(response.status === 200) {
            dispatch({
                type: CATEGORIES_SET,
                payload: response.data
            })
        }
    } catch (error) {
        
    }
}

export const clearCategoryState = () => (dispatch) => {
    dispatch({
        type: CATEGORY_STATE_CLEAR
    })
}