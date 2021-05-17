import { ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@ObjectType()
@Entity('entry')
export class Entry {}
