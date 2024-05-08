import { Field, ID, Int, ObjectType } from "type-graphql";
import { Node } from "../interfaces/Node";
import { CreateUUID } from "../utils/RelayUUIDs";

@ObjectType({ implements: Node })
export class User implements Node {
  @Field((_type) => ID!)
  id() {
    return CreateUUID("User", this.userID);
  }

  @Field((_type) => Int!)
  userID: number;

  @Field()
  firstName: string;
}
