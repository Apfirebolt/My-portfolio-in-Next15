import axios from "axios";

let baseURL = "https://softgenie.org/api/";

const httpClient = axios.create({ baseURL });

// Create a request interceptor

export default httpClient;
