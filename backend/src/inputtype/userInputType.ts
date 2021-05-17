import { Field, InputType, Int } from "type-graphql";
import { Service } from "typedi";
import { User } from "../entity/userEntity";

@Service()
@InputType()
export class CreateUserInputType implements Partial<User> {
  @Field((type) => String)
  firstName: string;

  @Field((type) => String)
  lastName: string;

  @Field((type) => Int, { nullable: true })
  age?: number | null;
}
