import { Arg, Field, GraphQLISODateTime, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Team } from "./teamEntity";
import { Todo } from "./todoEntity";

@Entity("user")
@ObjectType()
export class User {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String)
  @Column({ name: "first_name" })
  firstName: string;

  @Field((type) => String)
  @Column({ name: "last_name" })
  lastName: string;

  @Field((type) => Int)
  @Column({ name: "age", nullable: true })
  age?: number | null;

  @Field((type) => GraphQLISODateTime)
  @CreateDateColumn({ type: "datetime", name: "created_at" })
  createdAt: Date;

  @Field((type) => GraphQLISODateTime)
  @UpdateDateColumn({ type: "datetime", name: "updated_at" })
  updatedAt: Date;

  @Field((type) => GraphQLISODateTime, { nullable: true })
  @DeleteDateColumn({ type: "datetime", name: "deleted_at", nullable: true })
  deletedAt?: Date | null;

  @ManyToOne((type) => Team)
  @JoinColumn({ name: "team_id", referencedColumnName: "id" })
  team: Team;

  @OneToMany((type) => Todo, (todo) => todo.asignee)
  todos: Todo[];
}
