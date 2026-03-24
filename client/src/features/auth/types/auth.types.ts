export type User = {
  id: string;
  name: string;
  email: string;
  plan: "free";
  createdAt?: string;
  updatedAt?: string;
};

export type AuthSuccessResponse = {
  user: User;
  token: string;
};

export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  details?: unknown;
};
