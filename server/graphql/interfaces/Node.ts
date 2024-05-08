import { Field, ID, InterfaceType } from "type-graphql";
import { ParseUUID } from "../utils/RelayUUIDs";
import { table } from "console";

@InterfaceType({ resolveType: value => {
  const { typeName } = ParseUUID(value.id)
  return typeName
}})
export abstract class Node {
  @Field((_type) => ID!)
  id: ((() => string) | string);
}

export interface NodeResolver {
  getByID: (id: string) => Promise<Node | null>;
}
