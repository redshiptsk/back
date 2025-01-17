import {Module} from '@nestjs/common';
import {CharacteristicsController} from './characteristics.controller';
import {CharacteristicsService} from './characteristics.service';
import {SequelizeModule} from '@nestjs/sequelize';
import {Characteristic, CharacteristicValue} from './entities';

@Module({
    imports: [
        SequelizeModule.forFeature([Characteristic, CharacteristicValue])
    ],
    controllers: [CharacteristicsController],
    providers: [CharacteristicsService],
    exports: [CharacteristicsService],
})
export class CharacteristicsModule {
}
