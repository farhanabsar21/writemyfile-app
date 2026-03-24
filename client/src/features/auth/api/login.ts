import { api } from "../../../services/api";
import type {
  ApiSuccessResponse,
  AuthSuccessResponse,
} from "../types/auth.types";

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const response = await api.post<ApiSuccessResponse<AuthSuccessResponse>>(
    "/auth/login",
    payload,
  );

  return response.data.data;
};
