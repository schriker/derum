import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date custom scalar type';

  parseValue(value: number): Date {
    return new Date(value);
  }

  serialize(value: Date): string {
    return new Date(value).toISOString();
  }

  parseLiteral(ast: ValueNode) {
    if (ast.kind === Kind.INT || ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  }
}
