import { Field, InputType } from "type-graphql";
import { Service } from "typedi";
import { Todo } from "../entity/todoEntity";
import { User } from "../entity/userEntity";

@Service()
@InputType()
export class CreateTodoInputType implements Partial<Todo> {
  @Field((type) => String)
  title: string;

  @Field((type) => String)
  body: string;

  // @Field((type) => User, { nullable: true })
  // asignee?: User;
}
