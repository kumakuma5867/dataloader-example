import {
  Arg,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Inject } from "typedi";
import { User } from "../entity/userEntity";
import { CreateUserInputType } from "../inputtype/userInputType";
import { UserService } from "../service/userService";

@Resolver((of) => User)
export class UserResolver {
  constructor(
    @Inject()
    private userService: UserService
  ) {}

  /*** Query ***/
  @Query((returns) => [User], { description: "Fetch all users" })
  async fetchUsers() {
    return this.userService.fetchUsers();
  }

  /*** Mutation ***/
  @Mutation((returns) => User, { description: "Create new user" })
  async createUser(@Arg("user") user: CreateUserInputType) {
    return this.userService.createUser(user);
  }

  @Mutation((returns) => Int, { description: "Delete user" })
  async softDeleteUser(@Arg("userId") userId: number) {
    this.userService.deleteUser(userId);
    return userId;
  }

  @Mutation((returns) => User, { description: "Restore deleted user" })
  async restoreUser(@Arg("userId") userId: number) {
    return this.userService.restoreUser(userId);
  }
}
