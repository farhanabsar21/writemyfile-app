import bcrypt from "bcryptjs";
import { AppError } from "../../common/errors/AppError";
import { APP_CONSTANTS } from "../../common/constants/app.constants";
import { generateJwt } from "../../utils/generateJwt";
import { UserModel } from "../user/user.model";
import { SafeUser } from "../user/user.types";
import { LoginInput, RegisterInput } from "./auth.validation";

type AuthSuccessResponse = {
  user: SafeUser;
  token: string;
};

const toSafeUser = (user: {
  _id: unknown;
  name: string;
  email: string;
  plan: SafeUser["plan"];
  createdAt?: Date;
  updatedAt?: Date;
}): SafeUser => {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    plan: user.plan,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const registerUser = async (
  input: RegisterInput,
): Promise<AuthSuccessResponse> => {
  const existingUser = await UserModel.findOne({ email: input.email });

  if (existingUser) {
    throw new AppError("An account with this email already exists", 409);
  }

  const passwordHash = await bcrypt.hash(
    input.password,
    APP_CONSTANTS.AUTH.SALT_ROUNDS,
  );

  const user = await UserModel.create({
    name: input.name,
    email: input.email,
    passwordHash,
  });

  const token = generateJwt({
    userId: String(user._id),
    email: user.email,
  });

  return {
    user: toSafeUser(user),
    token,
  };
};

export const loginUser = async (
  input: LoginInput,
): Promise<AuthSuccessResponse> => {
  const user = await UserModel.findOne({ email: input.email });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(
    input.password,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateJwt({
    userId: String(user._id),
    email: user.email,
  });

  return {
    user: toSafeUser(user),
    token,
  };
};

export const getCurrentUser = async (userId: string): Promise<SafeUser> => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return toSafeUser(user);
};
