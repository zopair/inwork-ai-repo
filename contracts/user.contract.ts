export type UserRoleType = "CUSTOMER" | "WORKER" | "ADMIN";

export interface UserDTO {
  id: string;
  name: string;
  role: UserRoleType;
  phone: string;
}
