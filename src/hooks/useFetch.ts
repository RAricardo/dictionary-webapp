import { useEffect, useState } from "react";
import { NotFoundError } from "../types/error";

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useFetch = <T>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (url) {
        try {
          const response = await fetch(url);
          const result = await response.json();
          if (response.ok) {
            setData(result as T);
            setError(null);
          } else {
            throw new NotFoundError(
              result.message,
              result.resolution,
              result.title
            );
          }
        } catch (error) {
          if (error instanceof NotFoundError) {
            setError(error);
            setData(null);
          }
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
