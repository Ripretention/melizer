import {Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export class User {
	@PrimaryColumn()
	public id: number;

	@Column()
	public username: string;
}
