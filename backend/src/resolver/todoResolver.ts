import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Inject } from "typedi";
import { Todo } from "../entity/todoEntity";
import { CreateTodoInputType } from "../inputtype/todoInputType";
import { TodoService } from "../service/todoService";

@Resolver((of) => Todo)
export class TodoResolver {
  constructor(
    @Inject()
    private todoService: TodoService
  ) {}

  @Query((returns) => [Todo])
  async fetchTodos() {
    return await this.todoService.fetchTodos();
  }

  @Mutation((returns) => Todo)
  async createTodo(@Arg("todo") input: CreateTodoInputType) {
    return this.todoService.createTodo(input);
  }

  @FieldResolver()
  async asignee(@Root() todo: Todo) {
    return this.todoService.loaderForAsignee.load(todo);
  }
}
