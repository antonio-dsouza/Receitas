import {
  IUsersRepository,
} from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";
import prismaClient from "@shared/infra/prisma";
import { IRegisterUserDTO } from "@modules/auth/dtos/IRegisterUserDTO";
import { IUpdateUserDTO } from "@modules/auth/dtos/IUpdateUserDTO";

class UsersRepository implements IUsersRepository {
  async findAllUsers(): Promise<User[]> {
    const users = prismaClient.user.findMany();

    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = prismaClient.user.findFirst({
      where: {
        id: id,
      },
      include: {
        group: {
          include: {
            group_has_permission: {
              include: {
                permission: true,
              },
            },
          },
        }
      },
    });
    return user;
  }

  async save({
    name,
    email,
    password
  }: IRegisterUserDTO): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return user;
  }

  async updateUser({ id, name, email, password }: IUpdateUserDTO): Promise<void> {
    await prismaClient.user.update({
      data: {
        name,
        email,
        password,
      },
      where: {
        id: id,
      },
    });
  }

  async deleteUser(id: number): Promise<void> {
    await prismaClient.user.deleteMany({
      where: {
        id: id,
      },
    });
  }
}

export { UsersRepository };
