
export class ApiResponse<T> {
    constructor(customMessage: string) {
        this.customMessage = customMessage;
    }

    public payload!: T;
    public customMessage: string;
    public code!: number;
}