import { PrismaClient } from "@prisma/client";
import { Arg, Field, ID, Query } from "type-graphql";
import { Users } from "../prisma/generated/type-graphql";

const prisma = new PrismaClient();

export class UserResolver {
  @Query((_returns) => Users)
  async user(@Arg("id") id: number) {
    const user = await prisma.users.findFirst({ where: { userID: id } });

    return user;
  }
}
