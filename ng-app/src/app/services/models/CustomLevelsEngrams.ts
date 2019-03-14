import { CustomLevel } from './CustomLevel';


export class CustomLevelsEngrams {

    public player: CustomLevel;
    public dino: CustomLevel;
    public engramPoints: Array<number>;

    constructor() {
        this.player = new CustomLevel('Players');
        this.dino = new CustomLevel('Dinos');
        this.engramPoints = [];
    }

    public load(customLevels: CustomLevelsEngrams): CustomLevelsEngrams {
        if (customLevels && typeof customLevels === 'object') {
            this.player = new CustomLevel('Players').load(customLevels.player);
            this.dino = new CustomLevel('Dinos').load(customLevels.dino);
            this.engramPoints = customLevels.engramPoints;
        }
        return this;
    }


    public toDataConfig(): string {
        return '';
    }
}
