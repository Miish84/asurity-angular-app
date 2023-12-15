
export class State {
    public name!: string;
    public abbreviation!: string;

    constructor(model?: State) {
        if (model)
            Object.assign(this, model);
    }
}