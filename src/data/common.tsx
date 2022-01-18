export interface Expense {
    id: number;
    row: number;
    date: Date,
    description: string,
    amount: number
}

export interface ExpenseState {
    expense: Expense[]
}