import { text } from "stream/consumers";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Team {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text', {
        unique: true,
    })
    name: string;

    @Column('text', {
        unique: true,
    })
    shortName: string;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;
}
