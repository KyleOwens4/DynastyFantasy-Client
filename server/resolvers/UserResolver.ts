import { PrismaClient } from "@prisma/client";
import { Arg, ID, Query } from "type-graphql";
import { User } from "../graphql/types/User";
import { CreateUUID, ParseUUID } from "../graphql/utils/RelayUUIDs";
import { NodeResolver } from "../graphql/interfaces/Node";

const prisma = new PrismaClient();

export class UserResolver implements NodeResolver {
  @Query((_returns) => User)
  async user(@Arg("id", (_type) => ID!) id: string) {
    const { primaryKey } = ParseUUID(id);

    return await prisma.users.findFirst({ where: { userID: primaryKey } });
  }

  async getByID(id: string) {
    const { primaryKey } = ParseUUID(id);

    const user = await prisma.users.findFirst({
      where: { userID: primaryKey },
    });
    if (!user) return null;

    return { ...user, id: CreateUUID("Users", user.userID) };
  }
}
