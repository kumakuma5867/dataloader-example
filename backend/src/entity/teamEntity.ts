import { Field, Int, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./userEntity";

@ObjectType()
@Entity()
export class Team {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field((type) => String)
  @Column({ type: "varchar", length: 200 })
  name: string;

  @Field((type) => [User], { nullable: true })
  @OneToMany((type) => User, (user) => user.team)
  users?: User[] | null;
}
