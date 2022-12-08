import {TgContext} from "tg-io";
import {ChatStatistic} from "../entities/ChatStatistic";
import {UserStatistic} from "../entities/UserStatistic";

export class MessageContext extends TgContext.Message {
	public userStat: UserStatistic | null;
	public chatStat: ChatStatistic | null;
}
