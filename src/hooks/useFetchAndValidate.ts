
import { fetchAndValidateData } from "../utils/fetchAndValidateData";
import { useState, useEffect } from "react";

type Item = ReturnType<typeof fetchAndValidateData> extends Promise<infer T> ? T : never;

export const useFetchAndValidate = (url: string) => {
    const [data, setData] = useState<Item | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                // const res = await fetch(url);
                // const result = await res.json();
                const result = await fetchAndValidateData(url)
                setData(result);
                setLoading(false)
                setError(null)
            } catch (err) {
                setLoading(false)
                if (err instanceof Error)
                    setError(err.message)
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};