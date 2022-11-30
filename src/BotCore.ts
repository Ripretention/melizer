import * as debug from "debug";
import {Tg} from "tg-io";
import {DataSource} from "typeorm";
import {Chat} from "./entities/Chat";
import {User} from "./entities/User";
import {UserStatistic} from "./entities/UserStatistic";
import {UserStatisticRepository} from "./repositories/UserStatisticRepository";
import {AuthService} from "./services/AuthService";
import {InfoService} from "./services/InfoService";
import {IConfig} from "./types/IConfig";

export class BotCore {
	private tg: Tg;
	private log: debug;
	private label: string;
	private dataSource: DataSource;
	private userStatRepository: UserStatisticRepository;
	constructor(private readonly config: IConfig) {}

	public async start(label?: string) {
		await this.init(label ?? "bot");

		this.log("start polling");
		await this.tg.startPolling();
		return;
	}
	private async init(label: string) {
		this.label = label;
		let log = debug(`${this.label}:core`);

		log("init logger");
		this.log = log;

		log(`init tg, TOKEN=${this.config.ACCESS_TOKEN.slice(0, 8)}..`);
		this.tg = new Tg(this.config.ACCESS_TOKEN);

		log("init datasource");
		this.dataSource = new DataSource({
			type: "postgres",
			host: this.config.HOST,
			username: this.config.USERNAME,
			port: this.config.PORT,
			password: this.config.PASSWORD,
			database: this.config.DATABASE,
			entities: [User, Chat, UserStatistic],
			synchronize: true
		});
		this.dataSource = await this.dataSource.initialize();

		log("init repositories");
		this.userStatRepository = new UserStatisticRepository(this.dataSource);

		log("init services");
		let { updates } = this.tg;
		new InfoService().serve(updates.hearCommand.bind(updates));
		new AuthService(this.userStatRepository).serve(updates.onMessageEvent.bind(updates));

		log("initialization is finished");
	}
}
