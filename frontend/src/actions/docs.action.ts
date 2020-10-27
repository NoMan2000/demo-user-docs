import { DocRequest, DocResponse } from '../../types';
import { axios } from '../utils/axios';
import { BASE_URL } from './constants';

export const fetchDocs = async (): Promise<Array<DocResponse>> => {
    const { data } = await axios.get<Array<DocResponse>>(`${BASE_URL}/docs`);
    return data;
}

export const fetchDoc = async (id: string): Promise<DocResponse> => {
    const { data } = await axios.get<DocResponse>(`${BASE_URL}/docs/${id}`);
    return data;
}

/**
 *
 * @refId: The ID of the entry which the file(s) will be linked to.
ref: The name of the model which the file(s) will be linked to (see more below).
source (optional): The name of the plugin where the model is located.
field: The field of the entry which the file(s) will be precisely linked to.

 */

export const submitDoc = async (bodyData: DocRequest): Promise<DocResponse> => {
    const formData = new FormData();

    const newData = JSON.stringify({
        article: bodyData.article,
        article_name: bodyData.article_name,
        user: bodyData.user?.id?.toString(),
        ref: 'docs',
        field: 'uploads',
        categories: bodyData.categories,
    });
    formData.append('data', newData);

    if (bodyData.uploads) {
        for (const upload of bodyData.uploads) {
            formData.append(`files.uploads`, upload, upload.name);
        }
    }

    if (bodyData?.id) {
        const { data } = await axios.put<DocResponse>(`${BASE_URL}/docs/${bodyData.id}`, formData);
        return data;
    }
    const { data } = await axios.post<DocResponse>(`${BASE_URL}/docs`, formData);
    return data;
}