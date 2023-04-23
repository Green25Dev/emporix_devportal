import axios from "axios";
export async function iceCatDemoRequest(url, data , headers) {
    const res = await axios.post(url, data, {headers})
    return res
}

