import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Characteristic, CharacteristicValue} from './entities';
import {CharacteristicDto, CreateCharacteristicDto} from './dto';

@Injectable()
export class CharacteristicsService {
    constructor(
        @InjectModel(Characteristic)
        private characteristicModel: typeof Characteristic,
        @InjectModel(CharacteristicValue)
        private characteristicValueModel: typeof CharacteristicValue,
    ) {
    }

    async create({key, values}: CreateCharacteristicDto): Promise<CharacteristicDto> {
        let characteristic = await this.characteristicModel.findOne({
            where: {key},
        });

        if (!characteristic) {
            characteristic = await this.characteristicModel.create({
                key: key,
            });
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
                });
            }

        }

        return await this.characteristicModel.findByPk(characteristic.id, {
            include: [CharacteristicValue],
        });
    }
}
