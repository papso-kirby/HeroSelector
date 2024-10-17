import axios from 'axios';

export const getData = async (endpoint) => {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const getSession = async (sessionID) => JSON.parse(await getData(`/sessions/${sessionID}`));