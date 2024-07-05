import { AxiosRequestConfig, CanceledError } from 'axios';
import { useEffect, useState } from 'react';
import { apiClient } from '../services/api-client';
import { Product, validateDetails } from '../utils/validateData';


const useFetchAndValidateDetails = (endpoint: string, config?: AxiosRequestConfig, deps?: object) => {

    const [data, setData] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await apiClient.get(endpoint, { signal, ...config });
                const data: unknown = res.data;
                const validatedData = validateDetails(data);
                setData(validatedData);
                setIsLoading(false);
            } catch (error) {
                if (error instanceof CanceledError) {
                    setError(error.message);
                    setIsLoading(false);
                }
            }
        }
        fetchData();

        return () => controller.abort();
    }, [endpoint, config, deps])
    return { data, error, isLoading }
}

export default useFetchAndValidateDetails;