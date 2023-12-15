
export class ContactFrequency {
    public id!: number;
    public description!: string;

    constructor(model?: ContactFrequency) {
        if (model)
            Object.assign(this, model);
    }
}