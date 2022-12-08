import {
	Entity, 
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	Index,
	CreateDateColumn
} from "typeorm";
import {Chat} from "./Chat";
import {Statistic} from "./Statistic";

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
