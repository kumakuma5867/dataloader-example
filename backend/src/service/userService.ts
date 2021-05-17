import { Service } from "typedi";
import { getRepository, Repository, In } from "typeorm";
import { User } from "../entity/userEntity";
import { CreateUserInputType } from "../inputtype/userInputType";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Team } from "../entity/teamEntity";
import DataLoader = require("dataloader");

@Service()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  async fetchUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async retrieveUser(id: number) {
    return this.userRepository.findOneOrFail(id);
  }

  async createUser(input: CreateUserInputType) {
    const addedUser = this.userRepository.create(input);
    return this.userRepository.save(addedUser);
  }

  async deleteUser(id: number) {
    await this.userRepository.softDelete(id);
  }

  async restoreUser(id: number) {
    await this.userRepository.restore(id);
    return await this.userRepository.findOneOrFail(id);
  }

  async fetchUsersByTeams(teams: Team[]) {
    console.log("Called only one time.");
    //必要になるuserをまとめて取得
    const users = await this.userRepository.find({
      where: {
        teamId: In(teams.map((team) => team.id)),
      },
    });
    // Dataloaderの特性として、「引数の配列と同じ要素数の配列」を「順番が合致するように」返却する必要あり
    return teams.map((team) => {
      users.find((user) => user.teamId === team.id);
    });
  }

  loaderForTeams = new DataLoader(async (teams: Team[]) => {
    return await this.fetchUsersByTeams(teams);
  });
}
