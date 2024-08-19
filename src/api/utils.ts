import {
  useQuery as useQueryBase,
  UseQueryResult,
} from '@tanstack/react-query';
import { BASE_API_URL } from './config';
import axios from 'axios';

export const useAPIQuery = (
  targetUrl: string,
  queryParams?: Record<string, string>,
  autoFetch: boolean = true,
) => {
  const res = useQueryBase({
    enabled: autoFetch,
    queryKey: [targetUrl],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_API_URL}/api${targetUrl}?${
          queryParams
            ? `${Object.keys(queryParams)
                .map((key: string) => `${key}=${queryParams[key]}`)
                .join('&')}`
            : ''
        }`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
            'ngrok-skip-browser-warning': true,
          },
        },
      );
      return response.data;
    },
  });

  return {
    ...res,
    isLoading: isQueryLoading(res),
    refetch: () => res.refetch(
      
    ),
  };
};

export const isQueryLoading = (query: UseQueryResult) => {
  return (
    query.isLoading || query.isFetching || query.isRefetching || query.isPending
  );
};
