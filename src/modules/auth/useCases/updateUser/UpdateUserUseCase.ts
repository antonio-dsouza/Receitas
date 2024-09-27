import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUpdateUserDTO } from "@modules/auth/dtos/IUpdateUserDTO";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }
  async execute({
    id,
    name,
    email,
    password,
    group_id
  }: IUpdateUserDTO): Promise<void> {
    const user = await this.usersRepository.findById(id);
    
    if (!user) {
      throw new AppError("User no exists", 500);
    }
    
    const emailHasUser = await this.usersRepository.findByEmail(email);
    
    if (emailHasUser) {
      throw new AppError("There is already a user with the email");
    }
    
    if (password) {
      password = await hash(password, 10);
    }

    await this.usersRepository.updateUser({
      id,
      name,
      email,
      password,
      group_id
    });
  }
}

export { UpdateUserUseCase };
