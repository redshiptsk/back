import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Message extends Model<Message> {
    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    senderId: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    text: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    imageUrl: string | null;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    roomId: string;
}
