import * as TypeGraphQL from "type-graphql";

export enum UsersScalarFieldEnum {
  id = "id",
  firstName = "firstName"
}
TypeGraphQL.registerEnumType(UsersScalarFieldEnum, {
  name: "UsersScalarFieldEnum",
  description: undefined,
});
