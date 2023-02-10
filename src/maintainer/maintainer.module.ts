import { Module } from '@nestjs/common';
import { LeagueModule } from './league/league.module';
import { TeamModule } from './team/team.module';

@Module({
    imports: [
        LeagueModule,
        TeamModule
    ]
})
export class MaintainerModule {}
