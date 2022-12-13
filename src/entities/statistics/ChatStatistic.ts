import {
	Entity, 
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	Index,
	CreateDateColumn
} from "typeorm";
import {Statistic, Chat} from "../";

@Entity()
export class ChatStatistic extends Statistic {
	@PrimaryGeneratedColumn()
	public id: number;

	@Index("chat_statistic_idx")
	@OneToOne(() => Chat)
	@JoinColumn()
	public chat: Chat;

	@CreateDateColumn({ type: "timestamp" })
	public lastActivity: Date;
}
