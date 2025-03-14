export enum GenderEnum {
  MALE = "male",
  FEMALE = "female",
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  fullname: string;
  password: string;
  profile_picture: string;
  age: number;
  gender: GenderEnum;
  address: string;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
  created_by: string;
  updated_by: string;
  total_average_weight_ratings: number;
  number_of_rents: number;
  recently_active: number;
  potential_score: number;
}
