import axios from "axios"
import { API_CATEGORY } from "./constant"

export default class CategoryService {
    insertCategory = async(category) => {
        return await axios.post(API_CATEGORY, category);
    };
    getCategories = async() => {
        return await axios.get(API_CATEGORY);
    }
}