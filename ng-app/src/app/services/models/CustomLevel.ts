export class CustomLevel {

    public name: string;
    public level: number;
    public experience: number;
    public factor: number;
    public labels: Array<any>;
    public data: Array<any>;

    constructor(
        private _name: string = '',
        private _level: number = 100,
        private _experience: number = 100000
    ) {
        this.name = this._name;
        this.level = this._level;
        this.experience = this._experience;
        this.factor = this.calculateFactor();
        this.data = [];
        this.labels = [];
        this.calculateLevels();
    }

    public calculateLevels() {
        this.data = [];
        this.labels = [];
        for (let i = 1; i <= this.level; i++) {
            this.data.push(this.calculateY(i));
            this.labels.push(i.toFixed(0));
        }
    }

    private calculateFactor() {
        return Math.log(this.experience) / Math.log(this.level);
    }

    private calculateY(level): number {
        return parseInt(Math.pow(level, this.calculateFactor()).toFixed(0), 0);
    }

    public getDataSet(): Array<{ data: Array<number>, label: string }> {
        return [{ data: this.data, label: this.name }];
    }

    public load(customLevel: any): CustomLevel {
        if (customLevel && typeof customLevel === 'object') {
            for (const key in this) {
                if (customLevel.hasOwnProperty(key)) {
                    this[key] = <any>(<any>customLevel[<any>key]);
                }
            }
        }
        return this.validate() ? this : new CustomLevel(this.name);
    }

    public toDataConfig(): String {
        return '';
    }

    public validate(): Boolean {
        let result: Boolean = true;
        for (const key in this) {
            if (this.hasOwnProperty(key)) {
                if (
                    this[key] === undefined ||
                    this[key] === null ||
                    (
                        typeof this[key] === 'number' &&
                        (<number>(this[<any>key]) < 0)
                    )
                ) {
                    result = false;
                }
            }
        }
        return result;
    }

}
