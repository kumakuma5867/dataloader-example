import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./userEntity";

@Entity("todo")
@ObjectType()
export class Todo {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String)
  @Column({ type: "varchar", length: 100, name: "title" })
  title: string;

  @Field((type) => String)
  @Column({ type: "mediumtext", name: "body" })
  body: string;

  @Field((type) => User, { nullable: true })
  @ManyToOne((type) => User)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  asignee?: User;
}
