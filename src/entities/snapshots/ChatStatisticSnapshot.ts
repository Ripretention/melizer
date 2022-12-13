import {JoinTable, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Chat, StatisticSnapshot} from "../";

export class ChatStatisticSnapshot extends StatisticSnapshot {
	@PrimaryGeneratedColumn()
	public id: number;

	@OneToOne(() => Chat)
	@JoinTable()
	public chat: Chat;
}
