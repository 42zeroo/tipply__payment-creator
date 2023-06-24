import { useEffect, useState, DependencyList } from 'react';

export const useFetch = <T, D extends DependencyList>(
  fetchFn: () => Promise<T>,
  dependencies: D
): [T | null, boolean] => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await fetchFn();
        setData(result);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchFn, ...dependencies]);

  return [data, isLoading];
};
