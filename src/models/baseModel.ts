import { Field, ID, ObjectType } from "type-graphql";
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
export default class BaseModel {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created: Date;

  @Field(() => Date)
  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated: Date;
}
