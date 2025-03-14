// controller/api.ts
import { Request, Response, NextFunction } from "express";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import * as bcrypt from "bcrypt";

import UserCollection from "../repository/userCollection";
import { setPagination } from "../helpers/pagination.helper";
import { IPagination } from "../interfaces/pagination.interface";
import { User } from "../entities/user";
import {
  CreateUserDTO,
  ReqGetUserListDTO,
  UpdateUserDTO,
} from "../dto/user.dto";
import { calculatePotentialScore } from "../helpers/potentialScore";

export class UserController {
  constructor() {}

  async getUserDetailController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.params["user_id"];

      if (!userId || userId == undefined || userId == null) {
        res
          .status(400)
          .json({ message: "Bad Request", error: "User id is required" });
      }

      const user = await UserCollection.getUserById(userId);

      if (!user) {
        res.status(404).json({ message: "Data not found", data: null });
      }

      res.status(200).json({ message: "Success", data: user });
    } catch (error) {
      next(error);
    }
  }

  async getUsersController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const reqQuery = plainToInstance(ReqGetUserListDTO, req.query);

      const users = await UserCollection.getUsers(reqQuery);

      let mapResp = {
        message: "success but data list empty",
        data: users.data,
      };

      if (users.count > 0) {
        mapResp.message = "success";
        const pagination: IPagination = setPagination(req, users.count);
        Object.assign(mapResp, { pagination });
      }

      res.status(200).json(mapResp);
    } catch (error) {
      next(error);
    }
  }

  async updateUserController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.params["user_id"];

      if (!userId || userId == undefined || userId == null) {
        res
          .status(400)
          .json({ message: "Bad Request", error: "User id is required" });
      }

      const user: Partial<User> = plainToInstance(UpdateUserDTO, req.body);

      // Validasi DTO
      validate(user).then((errors) => {
        // errors is an array of validation errors
        if (errors.length > 0) {
          const errorMessages = errors
            .map((error) => Object.values(error.constraints || {}))
            .flat();
          res
            .status(400)
            .json({ message: "Validation failed", errors: errorMessages });
        }
      });

      const userPlain = instanceToPlain(user);

      const getDetail = await UserCollection.getUserById(userId);

      userPlain["potentialScore"] = calculatePotentialScore(
        getDetail.total_average_weight_ratings,
        getDetail.number_of_rents,
        getDetail.recently_active
      );
      userPlain["update_at"] = new Date();
      userPlain["recentlyActive"] = Date.now();

      const resUpdate = await UserCollection.updateUser(userId, userPlain);

      res.status(200).json({ message: "Success Update", data: resUpdate });
    } catch (error) {
      next(error);
    }
  }

  async createUserController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = plainToInstance(CreateUserDTO, req.body);

      await this.checkUsername(user.username);

      // Validasi DTO
      validate(user).then((errors) => {
        // errors is an array of validation errors
        if (errors.length > 0) {
          const errorMessages = errors
            .map((error) => Object.values(error.constraints || {}))
            .flat();
          res
            .status(400)
            .json({ message: "Validation failed", errors: errorMessages });
        }
      });

      const resCreate = await UserCollection.createUser(instanceToPlain(user));

      resCreate["password"] = await bcrypt.hashSync(resCreate["password"], 10);

      res.status(200).json({ message: "Success Update", data: resCreate });
    } catch (error) {
      next(error);
    }
  }

  private async checkUsername(username: string) {
    const user = await UserCollection.getUserByUsername(username);

    if (user) {
      const err: any = new Error("username already exist");
      err.status = 400;
      throw err;
    }

    return true;
  }
}

export default new UserController();
