export type UserType = {
  id: number;
  username: string;
};

export type UserActionType = {
  type: string;
  payload: UserType;
};
