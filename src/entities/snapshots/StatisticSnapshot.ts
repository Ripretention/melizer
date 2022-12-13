import {CreateDateColumn, Entity} from "typeorm";
import {Statistic} from "../statistics";

@Entity()
export class StatisticSnapshot extends Statistic {
	@CreateDateColumn({ type: "timestamp" })
	public date: Date;
}
