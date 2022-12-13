import {Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {StatisticSnapshot} from "./";
import {Chat} from "../";

@Entity()
export class ChatStatisticSnapshot extends StatisticSnapshot {
	@PrimaryGeneratedColumn()
	public id: number;

	@OneToOne(() => Chat)
	@JoinColumn()
	public chat: Chat;
}
