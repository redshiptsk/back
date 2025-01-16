import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductCharacteristicValue } from './product-characteristic-value.model';
import { ProductCharacteristicService } from './product-characteristic.service';
import { CharacteristicsModule } from '../characteristics/characteristics.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ProductCharacteristicValue]),
    CharacteristicsModule,
  ],
  providers: [ProductCharacteristicService],
  exports: [ProductCharacteristicService],
})
export class ProductCharacteristicModule {}
