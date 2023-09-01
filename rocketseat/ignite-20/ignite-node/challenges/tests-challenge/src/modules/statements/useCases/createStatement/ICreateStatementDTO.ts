import { Statement } from "../../entities/Statement";

export type ICreateStatementDTO = Partial<Pick<Statement, 'sender_id'>>
& Pick<Statement,
  'user_id' |
  'description' |
  'amount' |
  'type'
>
