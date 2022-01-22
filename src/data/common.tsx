export type ExpenseDetail = {
    id: number;
    row: number;
    expdate: string,
    description: string,
    amount: number
}

export type ExpenseState = {
    expenses: ExpenseDetail[],
    title: string
}