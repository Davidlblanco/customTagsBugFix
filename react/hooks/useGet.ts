import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function useGet<T>({ url, initialData }: UseGetProps<T>) {
   const [data, setData] = useState<T | null>(initialData ?? null);
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(false);

   const fetchData = useCallback(async () => {
      if (!url) {
         return;
      }
      try {
         setIsLoading(true);
         const response = await axios.get(url);
         setData(response.data);
      } catch (err) {
         setError(err);
      } finally {
         setIsLoading(false);
      }
   }, [url, setError, setData, setIsLoading]);

   useEffect(() => {
      fetchData();
   }, []);

   return { data, error, isLoading, refetch: fetchData, setData };
}

interface UseGetProps<T> {
   url?: string;
   initialData?: T;
}
