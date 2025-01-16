import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {CreateProductCharacteristicDto} from './dto';
import {ProductCharacteristicValue} from './product-characteristic-value.model';
import {CharacteristicsService} from '../characteristics/characteristics.service';
import {CharacteristicDto} from "../characteristics/dto";
import {Transaction} from "sequelize";

@Injectable()
export class ProductCharacteristicService {
    constructor(
        @InjectModel(ProductCharacteristicValue)
        private productCharacteristicValueModel: typeof ProductCharacteristicValue,
        private readonly characteristicsService: CharacteristicsService,
    ) {
    }

    async create(
        {
            productId,
            characteristic: characteristicDto,
        }: CreateProductCharacteristicDto,
        transaction?: Transaction
    ): Promise<CharacteristicDto> {
        const productCharacteristic = await this.characteristicsService.create(characteristicDto);

        for (const productCharacteristicValue of productCharacteristic.values) {
            await this.productCharacteristicValueModel.create({
                productId,
                characteristicId: productCharacteristic.id,
                characteristicValueId: productCharacteristicValue.id,
            }, {transaction});
        }

        return productCharacteristic;
    }
}
