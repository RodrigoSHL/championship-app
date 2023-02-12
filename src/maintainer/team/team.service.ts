import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { validate as IsUUID } from 'uuid';
@Injectable()
export class TeamService {
  private readonly logger = new Logger('TeamService');

  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    try {
      const team = this.teamRepository.create(createTeamDto);
      await this.teamRepository.save(team);
      return team;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.teamRepository.find({
      take: limit,
      skip: offset,
      // TODO: relations
    });
  }

  async findOne(term: string) {
    let team: Team;
    if (IsUUID(term)) {
       team = await this.teamRepository.findOneBy({ id: term });
    } else {
       team = await this.teamRepository.findOneBy({ shortName: term });
    }

    if (!team) throw new NotFoundException(`Team with id ${term} not found`);
    return team;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    const team = await this.teamRepository.preload({
      id: id,
      ...updateTeamDto
    })
    if (!team) throw new NotFoundException(`Team with id ${id} not found`);



    return this.teamRepository.save(team);
  }

  async remove(id: string) {
    const team = await this.findOne(id);
    await this.teamRepository.remove(team);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    // console.log(error)
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
