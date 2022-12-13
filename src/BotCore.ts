import {Tg} from "tg-io";
import * as debug from "debug";
import {DataSource} from "typeorm";
import {IConfig} from "./types/IConfig";
import {
	Chat, 
	ChatStatistic,
	ChatStatisticSnapshot,
	User,
	UserStatistic,
	UserStatisticSnapshot
} from "./entities";
import {
	AuthService,
	InfoService,
	LoggingService,
	SnapshotService,
	CalculatingService,
	ChatStatisticService,
	UserStatisticService
} from "./services";
import {
	UserStatisticRepository,
	ChatStatisticRepository,
	ChatSnapshotRepository,
	UserSnapshotRepository
} from "./repositories";
import {StatisticFormatter, UnitFormatter} from "./formatters";
import {MessageContext} from "./infrastructure/MessageContext";

export class BotCore {
	private tg: Tg;
	private log: debug;
	private label: string;
	private dataSource: DataSource;
	private userStatRepository: UserStatisticRepository;
	private chatStatRepository: ChatStatisticRepository;
	private chatSnapshotRepository: ChatSnapshotRepository;
	private userSnapshotRepository: UserSnapshotRepository;
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
				ChatStatistic,
				UserStatisticSnapshot,
				ChatStatisticSnapshot
			],
			synchronize: true
		});
		this.dataSource = await this.dataSource.initialize();

		log("init repositories");
		this.userStatRepository = new UserStatisticRepository(this.dataSource);
		this.chatStatRepository = new ChatStatisticRepository(this.dataSource);
		this.chatSnapshotRepository = new ChatSnapshotRepository(this.dataSource);
		this.userSnapshotRepository = new UserSnapshotRepository(this.dataSource);

		log("init services");
		let infoService = new InfoService();
		let statFormatter = new StatisticFormatter(new UnitFormatter());
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
			new SnapshotService(
				this.userSnapshotRepository,
				this.chatSnapshotRepository
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
