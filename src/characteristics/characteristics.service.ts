import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Characteristic, CharacteristicValue} from './entities';
import {CharacteristicDto, CreateCharacteristicDto} from './dto';
import {Transaction} from "sequelize";

@Injectable()
export class CharacteristicsService {
    constructor(
        @InjectModel(Characteristic)
        private characteristicModel: typeof Characteristic,
        @InjectModel(CharacteristicValue)
        private characteristicValueModel: typeof CharacteristicValue,
    ) {
    }

    async create({key, values}: CreateCharacteristicDto, transaction?: Transaction): Promise<CharacteristicDto> {
        let characteristic = await this.characteristicModel.findOne({
            where: {key},
        });

        if (!characteristic) {
            characteristic = await this.characteristicModel.create(
                {key},
                {transaction}
            );
        }

        for (const value of values) {
            const existingValue = await this.characteristicValueModel.findOne({
                where: {
                    value,
                    characteristicId: characteristic.id,
                },
            });

            if (!existingValue) {
                await this.characteristicValueModel.create({
                    value,
                    characteristicId: characteristic.id,
                }, {transaction});
            }

        }

        return await this.characteristicModel.findByPk(characteristic.id, {
            include: [CharacteristicValue],
        });
    }
}
