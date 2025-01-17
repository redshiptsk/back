import {Module} from '@nestjs/common';
import {CharacteristicsService} from './characteristics.service';
import {SequelizeModule} from '@nestjs/sequelize';
import {Characteristic, CharacteristicValue} from './entities';

@Module({
  imports: [SequelizeModule.forFeature([Characteristic, CharacteristicValue])],
  providers: [CharacteristicsService],
  exports: [CharacteristicsService],
})
export class CharacteristicsModule {}
