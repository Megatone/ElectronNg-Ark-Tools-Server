export class EngramsLevels {

    public name: string;
    public engrams: number;
    public level: number;
    public factor: number;
    public data: Array<number>;
    public labels: Array<string>;

    constructor(
        private _name: string = 'Engrams',
        private _level: number = 100,
        private _engrams: number = 1000
    ) {
        this.name = this._name;
        this.level = this._level;
        this.engrams = this._engrams;
        this.data = [];
        this.labels = [];
        //calcular en factor uno , funcion lineal ascendente de punta a punto b
        this.calculateLineal();
        // definir cuantos escalones y obtenemos los puntos por escalon
        this.calculateEscalonesData();
        //en cada escalon dividir por el numero de nuiveles 



    }


    public linealData: Array<number> = [];
    public escalones = 10;
    public escalonesData: Array<number> = [];


    public calculateLineal() {
        this.linealData = [];
        this.labels = [];
        for (let i = 1; i <= this.level; i++) {
            this.linealData.push(parseInt(((this.engrams / this.level) * i).toFixed(0), 0));
            this.labels.push(i.toFixed(0));
        }
    }

    public calculateEscalonesData() {
        this.escalonesData = [];
        const numItems = (this.level / this.escalones);
        for (let i = 0; i <= this.escalones - 1; i++) {
            const escalon: Array<number> = this.linealData.slice(0, (i * numItems) + numItems);
            let total = 0;
            let media = 0;
            escalon.forEach((e) => {
                total += e;
            })
            media = (total / escalon.length);
            this.escalonesData.push(media);
        }
        console.log(this.escalonesData);
    }


    public calculateLevels() {

    }




    public getDataSet(): Array<{ data: Array<number>, label: string }> {
        return [{ data: this.data, label: this.name }];
    }

}
