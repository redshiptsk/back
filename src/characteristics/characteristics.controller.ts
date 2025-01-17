import {Controller, Get, Query} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CharacteristicDto, CharacteristicsQueryDto} from './dto';
import {CharacteristicsService} from "./characteristics.service";

@ApiTags('characteristics')
@Controller('characteristics')
export class CharacteristicsController {
    constructor(
        private readonly characteristicsService: CharacteristicsService,
    ) {
    }

    @Get()
    findAll(
        @Query() characteristicsQuery: CharacteristicsQueryDto,
    ): Promise<CharacteristicDto[]> {
        return this.characteristicsService.findAll(characteristicsQuery);
    }
}
