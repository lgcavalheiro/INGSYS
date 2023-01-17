import { Field, ID, ObjectType } from "type-graphql";
import {
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectID,
} from "typeorm";

@ObjectType()
export default class BaseModel {
  @Field(() => ID)
  @ObjectIdColumn({ name: "_id" })
  _id: ObjectID;

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
