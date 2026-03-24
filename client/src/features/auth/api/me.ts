import { api } from "../../../services/api";
import type { ApiSuccessResponse, User } from "../types/auth.types";

export const getCurrentUser = async (): Promise<User> => {
  const response =
    await api.get<ApiSuccessResponse<{ user: User }>>("/auth/me");
  return response.data.data.user;
};
