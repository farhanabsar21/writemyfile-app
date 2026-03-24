export enum UserPlan {
  FREE = "free",
}

export type SafeUser = {
  id: string;
  name: string;
  email: string;
  plan: UserPlan;
  createdAt?: Date;
  updatedAt?: Date;
};
