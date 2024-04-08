import * as TypeGraphQL from "type-graphql";

export enum UsersScalarFieldEnum {
  userID = "userID",
  firstName = "firstName"
}
TypeGraphQL.registerEnumType(UsersScalarFieldEnum, {
  name: "UsersScalarFieldEnum",
  description: undefined,
});
