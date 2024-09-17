import axios from "axios";

interface Props {
    endpoint: string;
    query?: Record<string, string>;
    wrappedByKey?: string;
    wrappedByList?: boolean;
    page?: number;
    locale?: string;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
export default async function fetchApi<T>({
    endpoint,
    query,
    wrappedByKey,
    wrappedByList,
    page,
    locale
}: Props): Promise<T> {
    if (endpoint.startsWith('/')) {
        endpoint = endpoint.slice(1);
    }

    const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);

    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }
    
    if (page) {
        url.searchParams.append(`populate[${page}][populate]`, '*');
    } else {
        url.searchParams.append(`populate`, '*');
    }

    // const res = await fetch(url.toString());

    // let data = await res.json();
    
    let { data } = await axios.get(url.toString(), {
        headers: {
            Authorization:
                `Bearer ${import.meta.env.STRAPI_TOKEN}`,
        },
    });

    if (wrappedByKey) {
        data = data[wrappedByKey];
    }

    if (wrappedByList) {
        data = data[0];
    }

    return data as T;
}