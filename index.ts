import * as dotenv from "dotenv";
import {BotCore} from "./src/BotCore";
dotenv.config();

const core = new BotCore({
	ACCESS_TOKEN: process.env.ACCESS_TOKEN
});
(async () => {
	await core.start("melizer");
})().catch(console.error);
