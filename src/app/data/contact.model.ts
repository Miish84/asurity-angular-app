
export class Contact {
    public uuid!: string;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public street!: string;
    public city!: string;
    public state!: string;
    public zip?: number | null;
    public frequency?: number | null;

    constructor(model?: Partial<Contact>) {
        if (model)
            Object.assign(this, model);
    }
}