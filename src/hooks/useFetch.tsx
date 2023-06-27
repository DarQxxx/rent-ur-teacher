import React from 'react';

const useFetch = () => {
    const fetchData = async (url: string, config: {method: string, headers: {}, data: any}) => {
        const response = await fetch(url, {
            method : config.method? config.method : 'GET',
            headers: config.headers ? config.headers : {},
            body: config.data ? JSON.stringify(config.data) : null
        })
        if(!response.ok){
            throw new Error('Something went wrong')
        }
        const data = await response.json()
        return data
    }

    return fetchData
}

export default useFetch;
