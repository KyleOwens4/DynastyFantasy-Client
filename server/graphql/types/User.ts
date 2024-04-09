import { Field, ObjectType } from "type-graphql";
import { Node } from "../interfaces/Node";

@ObjectType({ implements: Node })
export class User implements Node {
  @Field()
  userID: number;

  @Field()
  firstName: string;
}
