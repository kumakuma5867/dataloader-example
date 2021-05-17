import DataLoader = require("dataloader");
import { Service } from "typedi";
import { In, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Todo } from "../entity/todoEntity";
import { CreateTodoInputType } from "../inputtype/todoInputType";
import { User } from "../types";

@Service()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>
  ) {}

  async createTodo(input: CreateTodoInputType) {
    const addedTodo = this.todoRepository.create(input);
    return this.todoRepository.save(addedTodo);
  }

  async fetchTodos() {
    return this.todoRepository.find();
  }

  async fetchAsginee(todos: Todo[]) {
    console.log("fooooo");
    return await this.todoRepository.find({
      id: In(todos.map((todo) => todo.id)),
    });
  }

  loaderForAsignee = new DataLoader(async (todos: Todo[]) => {
    return await this.fetchAsginee(todos);
  });
}
