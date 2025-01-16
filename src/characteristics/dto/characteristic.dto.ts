export class CharacteristicValueDto {
  id: number;
  value: string;
}

export class CharacteristicDto {
  id: number;
  key: string;
  values: CharacteristicValueDto[];
}
