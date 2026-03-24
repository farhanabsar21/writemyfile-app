import { api } from "../../../services/api";
import type {
  ApiSuccessResponse,
  AuthSuccessResponse,
} from "../types/auth.types";

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post<ApiSuccessResponse<AuthSuccessResponse>>(
    "/auth/register",
    payload,
  );

  return response.data.data;
};
