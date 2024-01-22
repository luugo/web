export interface User {
  authenticationId: string
  createdAt?: Date | null
  firstName: string
  id: string
  lastName: string
  place: string
  type: UserTypeEnum
}

export const UserTypeEnum = {
  Normal: 'NORMAL',
  Admin: 'ADMIN'
} as const;

export type UserTypeEnum = typeof UserTypeEnum[keyof typeof UserTypeEnum];