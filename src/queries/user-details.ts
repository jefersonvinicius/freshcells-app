import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../state/auth";
import { API } from "../services/api";

export function useUserDetailsQuery() {
  const { authData } = useAuth();
  const userID = authData?.userID;

  const { data, error, isLoading } = useQuery({
    queryKey: ["user", userID!],
    queryFn: () => API.fetchUser(),
    enabled: !!userID,
  });

  return {
    user: data,
    errorOnUser: error,
    isLoadingUser: isLoading,
  };
}
