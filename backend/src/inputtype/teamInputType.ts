import { Field, InputType } from "type-graphql";
import { Service } from "typedi";
import { Team } from "../entity/teamEntity";

@Service()
@InputType()
export class CreateTeamInputType implements Partial<Team> {
  @Field((type) => String)
  name: string;
}
