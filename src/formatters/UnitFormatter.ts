export class UnitFormatter {
	constructor(private readonly ceilPrecision: number = 1) {
		this.ceilPrecision = Math.max(1, this.ceilPrecision) * 10;
	}

	private readonly numberUnits = ["", "k", "m", "b", "t", "q", "q+"];
	public formatNumber(number: number): string {
		let degree = 0;
		for (let i = 3; Math.abs(number) >= 10**i; i += 3)
			degree = i;

		number = ~~((number / 10**degree) * this.ceilPrecision) / this.ceilPrecision;
		return `${number}${this.numberUnits[Math.min(~~(degree / 3), 6)]}`;
	}

	private readonly timeLimits = [1, 60, 3600, 86400, 604800, 18144e3, 662256e4];
	private readonly timeUnits = ["s", "m", "h", "d", "w", "m", "y"];
	public formatTime(time: Date): string {
		let diff = ~~((Date.now() - time.getTime()) / 1000);
		let index = this.timeLimits.findIndex(t => t > diff) - 1;
		return `${~~(diff / this.timeLimits[index])}${this.timeUnits[index] ?? "s"}`;
	}
}
