import { Arg, ID, Query } from "type-graphql";
import { ParseUUID } from "../graphql/utils/RelayUUIDs";
import { PrismaClient } from "@prisma/client";
import { UserResolver } from "./UserResolver";
import { Node } from "../graphql/interfaces/Node";
import { User } from "../graphql/types/User";

const prisma = new PrismaClient

export class NodeResolver {
    @Query((_returns) => Node, { nullable: true })
    async node(@Arg("id", (_type) => ID!) id: string) {
        const { typeName } = ParseUUID(id);

        if (typeName === "User") {
            return new UserResolver().getByID(id)
        }

        return null;
    }
}