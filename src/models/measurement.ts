import { Field, ObjectType } from "type-graphql";
import { Column } from "typeorm";

@ObjectType()
export default class Measurement {
  @Field(() => String)
  @Column()
  type: string;

  @Field(() => Number)
  @Column()
  quantity: number;
}
