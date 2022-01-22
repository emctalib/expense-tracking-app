export interface ExpenseBase {
    description: string,
    amount: number,
    createdAt: Date;
}

export interface ExpenseDetail extends ExpenseBase {
    id: string;
    row: number;
    // createdAt: new Date().toISOString(),
}

export type ExpenseState = {
    expenses: ExpenseDetail[],
    title: string
}