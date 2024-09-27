import { IRegisterUserDTO } from "../dtos/IRegisterUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { User } from "../infra/prisma/entities/User";

interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  findById(id: number): Promise<User>;
  findAllUsers(): Promise<User[]>;
  save({ name, email, password }: IRegisterUserDTO): Promise<User>;
  updateUser({ id, name, email, password }: IUpdateUserDTO): Promise<void>;
  deleteUser(id: number): Promise<void>;
}

export { IUsersRepository };
