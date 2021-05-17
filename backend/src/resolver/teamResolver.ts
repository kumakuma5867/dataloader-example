import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Inject } from "typedi";
import { Team } from "../entity/teamEntity";
import { User } from "../entity/userEntity";
import { CreateTeamInputType } from "../inputtype/teamInputType";
import { TeamService } from "../service/teamService";
import { UserService } from "../service/userService";

@Resolver((of) => Team)
export class TeamResolver {
  constructor(
    @Inject()
    private teamService: TeamService,
    @Inject()
    private userService: UserService
  ) {}

  @FieldResolver((type) => [User])
  async users(@Root() team: Team) {
    return this.userService.loaderForTeams.load(team);
  }

  /*** Query ***/
  @Query((returns) => [Team], { description: "Fetch all teams" })
  async fetchTeams() {
    return this.teamService.fetchTeams();
  }

  /*** Mutation ***/
  @Mutation((returns) => Team)
  async createTeam(@Arg("team") input: CreateTeamInputType) {
    return this.teamService.createTeam(input);
  }
}
