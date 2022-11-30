import * as dotenv from "dotenv";
import {BotCore} from "./src/BotCore";
dotenv.config();

const { env } = process;
const core = new BotCore({
	ACCESS_TOKEN: env.ACCESS_TOKEN,
	DATABASE: env.DATABASE,
	HOST: env.HOST,
	PORT: Number(env.PORT),
	USERNAME: env.USERNAME,
	PASSWORD: env?.PASSWORD
});
(async () => {
	console.log("starting..");
	await core.start("melizer");
})().catch(console.error);
