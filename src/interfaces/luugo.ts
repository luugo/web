import { Contact } from "./contact"
import { User } from "./user"

export interface Luugo {
  token: string
  user: User
  contacts: Contact[]
}