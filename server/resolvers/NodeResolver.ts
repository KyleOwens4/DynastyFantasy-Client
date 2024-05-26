import { Arg, ID, Query } from "type-graphql";
import { ParseUUID } from "../graphql/utils/RelayUUIDs";
import { UserResolver } from "./UserResolver";
import { Node } from "../graphql/interfaces/Node";

export class NodeResolver {
    @Query((_returns) => Node, { nullable: true })
    async node(@Arg("id", (_type) => ID!) id: string) {
        const { typeName } = ParseUUID(id);

        switch(typeName) {
            case "User":
                return new UserResolver().getByID(id);
        }

        return null;
    }
}