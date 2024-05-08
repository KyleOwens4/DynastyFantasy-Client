import { NonEmptyArray } from "type-graphql";
import { NodeResolver } from "./NodeResolver";
import { UserResolver } from "./UserResolver";

export const DyntasyResolvers: NonEmptyArray<Function> = [UserResolver, NodeResolver];
