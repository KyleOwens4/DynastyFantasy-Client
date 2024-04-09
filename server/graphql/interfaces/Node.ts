import { Field, ID, InterfaceType } from "type-graphql";

@InterfaceType()
export abstract class Node {
  @Field((_type) => ID!)
  id: string;
}
