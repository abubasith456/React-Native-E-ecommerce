// OpenStreetMapService.js
import axios from 'axios';

const BASE_URL = 'https://nominatim.openstreetmap.org';

export const getAddressFromLocation = async (latitude, longitude) => {
    try {
        const response = await axios.get(`${BASE_URL}/reverse`, {
            params: {
                format: 'json',
                lat: latitude,
                lon: longitude,
            },
        });
        if (response.data) {
            return response.data.display_name || 'Address not found';
        } else {
            throw new Error('No results found');
        }
    } catch (error) {
        throw error;
    }
};
