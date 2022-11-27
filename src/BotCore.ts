import * as debug from "debug";
import {Tg} from "tg-io";
import {InfoService} from "./services/InfoService";
import {IConfig} from "./types/IConfig";

export class BotCore {
	private tg: Tg;
	private log: debug;
	private label: string;
	constructor(private readonly config: IConfig) {}

	public async start(label?: string) {
		this.init(label ?? "bot");

		this.log("start polling");
		await this.tg.startPolling();
		return;
	}
	private init(label: string) {
		this.label = label;
		let log = debug(`${this.label}:core`);

		log("init logger");
		this.log = log;

		log(`init tg, TOKEN=${this.config.ACCESS_TOKEN.slice(0, 8)}..`);
		this.tg = new Tg(this.config.ACCESS_TOKEN);

		log("init info service");
		new InfoService().serve(this.tg.updates.hearCommand.bind(this.tg.updates));

		log("initialization is finished");
	}
}
