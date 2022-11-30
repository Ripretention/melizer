import {Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Chat {
	@PrimaryColumn()
	public id: number;
}
