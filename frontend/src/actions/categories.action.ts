import { Categories } from '../../types';
import { axios } from '../utils/axios';
import { BASE_URL } from './constants';

export const fetchCategories = async (): Promise<Array<Categories>> => {
    const { data } = await axios.get<Array<Categories>>(`${BASE_URL}/categories`)
    .catch(err => {
        throw err;
    });
    return data;
}