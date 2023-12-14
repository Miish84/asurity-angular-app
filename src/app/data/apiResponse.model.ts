
export class ApiResponse<T> {
    public payload!: T;
    public customMessage!: string;
    public code!: number;
}