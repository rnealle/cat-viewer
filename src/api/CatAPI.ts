import axios from 'axios';
export const CATS_API_BASE_URL = 'https://api.thecatapi.com/v1';

export const getAllBreeds = async () => {
    const breeds = await axios.get(CATS_API_BASE_URL + '/breeds');
    return breeds.data
};

export const getCatsOfBreed = async (breed_id: string, limit: number, page: number) => {
    const cats = await axios.get(CATS_API_BASE_URL + '/images/search', { params: {
        limit: limit,
        page: page,
        breed_id: breed_id,
        order: 'desc',
    }});
    return cats.data
};

export const getCatInfo = async (breed_id: string) => {
    const result = await axios.get(CATS_API_BASE_URL + '/images/' + breed_id);
    return result.data
};