import axios from "axios";

async function postData(url, data) {
    try {
        const response = await axios.post(url, data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

export default postData;