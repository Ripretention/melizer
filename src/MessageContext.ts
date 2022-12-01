import {TgContext} from "tg-io";
import {UserStatistic} from "./entities/UserStatistic";

export class MessageContext extends TgContext.Message {
	public userStat: UserStatistic | null;
}
