import { PrismaClient } from "@prisma/client";
import { Arg, Query } from "type-graphql";
import { User } from "../graphql/types/User";

const prisma = new PrismaClient();

export class UserResolver {
  @Query((_returns) => User)
  async user(@Arg("id") id: number) {
    const user = await prisma.users.findFirst({ where: { userID: id } });

    return user;
  }
}
