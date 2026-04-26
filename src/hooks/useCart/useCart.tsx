"use client";
import { useQuery } from "@tanstack/react-query";

export default function useCart<T>(fn: () => Promise<T>, key: string[], enabled: boolean = true) {
  const { data, isLoading, isFetched, isError } = useQuery<T>({
    queryKey: key,
    queryFn: fn,
    enabled
  });

  return { data, isLoading, isFetched, isError };
}
