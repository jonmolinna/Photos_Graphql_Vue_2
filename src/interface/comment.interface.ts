import type { LIKE_COMMENT } from './like.interface'
import type { USER } from './user.interface'

export interface COMMENT {
  _id: string
  comment: string
  createdAt: string
  post: string
  user: USER
  likes: LIKE_COMMENT[]
}
