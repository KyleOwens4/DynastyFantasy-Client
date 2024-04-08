import * as TypeGraphQL from "type-graphql";
import type { GraphQLResolveInfo } from "graphql";
import { AggregateUsersArgs } from "./args/AggregateUsersArgs";
import { Users } from "../../../models/Users";
import { AggregateUsers } from "../../outputs/AggregateUsers";
import { transformInfoIntoPrismaArgs, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Users)
export class AggregateUsersResolver {
  @TypeGraphQL.Query(_returns => AggregateUsers, {
    nullable: false
  })
  async aggregateUsers(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateUsersArgs): Promise<AggregateUsers> {
    return getPrismaFromContext(ctx).users.aggregate({
      ...args,
      ...transformInfoIntoPrismaArgs(info),
    });
  }
}
