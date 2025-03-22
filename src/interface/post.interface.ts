import type { COMMENT } from './comment.interface'
import type { LIKE_POST } from './like.interface'
import type { USER } from './user.interface'

export interface POST {
  _id: string
  comment: string
  createdAt: string
  user: USER
  likes: LIKE_POST[]
  comments: COMMENT[]
}
