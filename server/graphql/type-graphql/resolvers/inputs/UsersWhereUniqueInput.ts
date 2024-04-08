import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { StringFilter } from "../inputs/StringFilter";
import { UsersWhereInput } from "../inputs/UsersWhereInput";

@TypeGraphQL.InputType("UsersWhereUniqueInput", {})
export class UsersWhereUniqueInput {
  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  userID?: number | undefined;

  @TypeGraphQL.Field(_type => [UsersWhereInput], {
    nullable: true
  })
  AND?: UsersWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [UsersWhereInput], {
    nullable: true
  })
  OR?: UsersWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [UsersWhereInput], {
    nullable: true
  })
  NOT?: UsersWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  firstName?: StringFilter | undefined;
}
