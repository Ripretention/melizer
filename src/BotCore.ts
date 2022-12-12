import * as debug from "debug";
import {Tg} from "tg-io";
import {DataSource} from "typeorm";
import {Chat} from "./entities/Chat";
import {ChatStatistic} from "./entities/ChatStatistic";
import {User} from "./entities/User";
import {UserStatistic} from "./entities/UserStatistic";
import {StatisticFormatter, UnitFormatter} from "./formatters";
import {MessageContext} from "./infrastructure/MessageContext";
import {ChatStatisticRepository} from "./repositories/ChatStatisticRepository";
import {UserStatisticRepository} from "./repositories/UserStatisticRepository";
import {AuthService} from "./services/AuthService";
import {CalculatingService} from "./services/CalculatingService";
import {ChatStatisticService} from "./services/ChatStatisticService";
import {InfoService} from "./services/InfoService";
import {LoggingService} from "./services/LoggingService";
import {UserStatisticService} from "./services/UserStatisticService";
import {IConfig} from "./types/IConfig";

export class BotCore {
	private tg: Tg;
	private log: debug;
	private label: string;
	private dataSource: DataSource;
	private userStatRepository: UserStatisticRepository;
	private chatStatRepository: ChatStatisticRepository;
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

		log("init tg's contexts");
		this.tg.updates.setContext("message", MessageContext);

		log("init datasource");
		this.dataSource = new DataSource({
			type: "postgres",
			host: this.config.HOST,
			username: this.config.USERNAME,
			port: this.config.PORT,
			password: this.config.PASSWORD,
			database: this.config.DATABASE,
			entities: [
				User, 
				Chat, 
				UserStatistic, 
				ChatStatistic
			],
			synchronize: true
		});
		this.dataSource = await this.dataSource.initialize();

		log("init repositories");
		this.userStatRepository = new UserStatisticRepository(this.dataSource);
		this.chatStatRepository = new ChatStatisticRepository(this.dataSource);

		log("init services");
		let statFormatter = new StatisticFormatter(new UnitFormatter());
		let infoService = new InfoService();
		let userStatService = new UserStatisticService(statFormatter);
		let chatStatService = new ChatStatisticService(statFormatter);
		this.tg.updates.implementDecorators(
			new LoggingService(),
			new AuthService(
				this.userStatRepository,
				this.chatStatRepository
			),
			new CalculatingService(
				this.userStatRepository,
				this.chatStatRepository
			),
			infoService,
			userStatService,
			chatStatService
		);

		log("init commands");
		this.tg.commands.implementDecorators(
			infoService,
			userStatService,
			chatStatService
		);
		await this.tg.uploadCommands();

		log("initialization is finished");
	}
}
