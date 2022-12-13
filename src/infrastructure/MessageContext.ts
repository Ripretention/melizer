import {TgContext} from "tg-io";
import {UserStatistic, ChatStatistic} from "../entities";

export class MessageContext extends TgContext.Message {
	public userStat: UserStatistic | null;
	public chatStat: ChatStatistic | null;
}
