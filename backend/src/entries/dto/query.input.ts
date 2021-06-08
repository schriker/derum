import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { EntrySort } from '../types/entry-sort.enum';

registerEnumType(EntrySort, {
  name: 'EntrySort',
});

@InputType()
export class QueryEntriesInput {
  @Field()
  roomName: string;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  offset: number;

  @Field(() => EntrySort)
  sort: EntrySort;
}
