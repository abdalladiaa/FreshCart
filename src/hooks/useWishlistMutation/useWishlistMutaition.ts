import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useWishlistMutation<TData, TVariables>(
  fn: (variables: TVariables) => Promise<TData>,
  invalidateKeys?: QueryKey[],
  onSuccessMsg?: string,
  onErrorMsg?: string,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: fn,

    onSuccess: () => {
      if (onSuccessMsg) {
        toast.success(onSuccessMsg);
      }
      invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key })
      });
    },

    onError: () => {
      if (onErrorMsg) {
        toast.error(onErrorMsg);
      }
    },
  });
}
