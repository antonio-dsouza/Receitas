import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IRegisterUserDTO } from "@modules/auth/dtos/IRegisterUserDTO";
import { AppError } from "@shared/errors/AppError";

interface IResponse {
  user: {
    id: number;
    email: string;
  }
}

@injectable()
class RegisterUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }
  async execute({
    name,
    email,
    password,
  }: IRegisterUserDTO): Promise<IResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      email
    );

    if (userAlreadyExists) {
      throw new AppError("User already exists", 500);
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.usersRepository.save({
      name,
      email,
      password: hashedPassword,
    });

    const userReturn: IResponse = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    return userReturn;
  }
}

export { RegisterUserUseCase };
