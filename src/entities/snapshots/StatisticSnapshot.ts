import {CreateDateColumn, Entity} from "typeorm";
import {Statistic} from "../";

@Entity()
export class StatisticSnapshot extends Statistic {
	@CreateDateColumn({ type: "timestamp" })
	public date: Date;
}
