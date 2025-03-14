import { IUser } from "@repo/interfaces/user";

export interface User extends Partial<IUser> {
  id: any;
}
