import { API_URLS, LOCALSTORAGE_TOKEN_KEY } from "../utils";

//some things are required as we used to send in postman for API calls
const customFetch = async(url, { body, ...customConfig }) => {
    console.log(url)
    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

    //headers as we require in postman for api call
    const headers = {
        'content-type': 'application/json',
        Accept: 'application/json'
    }

    if(token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const config = {
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    };

    if(body) {
        //add body to config (username password etc)
        config.body = JSON.stringify(body);    //convert in JSON then ADD

    };

    try {
            console.log('config',config)
        const response = await fetch(url, config);
        const data = await response.json();

        if(data.success){
            return {
                data : data.data,
                success: true
            }
        }

        throw new Error(data.message);
        
    } catch (error) {
        console.error('error');
        return {
            message : error.message,
            success: false,
        }
    }

};


export const getPost = (page = 1, limit = 5) => {
    return customFetch(API_URLS.posts(page, limit), {
        method: 'GET',
    })
}