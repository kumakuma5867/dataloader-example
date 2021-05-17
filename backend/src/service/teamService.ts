import { Inject, Service } from "typedi";
import { getRepository, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Team } from "../entity/teamEntity";
import { CreateTeamInputType } from "../inputtype/teamInputType";
import { UserService } from "./userService";

@Service()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>
  ) {}

  async fetchTeams() {
    return await this.teamRepository.find();
  }

  async createTeam(input: CreateTeamInputType) {
    const addedTeam = this.teamRepository.create(input);
    return await this.teamRepository.save(addedTeam);
  }
}
