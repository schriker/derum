import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/comments/entities/comment.entity';
import { Entry } from 'src/entries/entities/entry.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class SearchResult {
  @Field(() => [User])
  users: User[];

  @Field(() => [Comment])
  comments: Comment[];

  @Field(() => [Entry])
  entires: Entry[];
}
