interface IUpdateUserDTO {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  group_id?: number;
}

export { IUpdateUserDTO };
