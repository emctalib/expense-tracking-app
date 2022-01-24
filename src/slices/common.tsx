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

export interface ILoginUserInfo {
    id: number;
    fullName: string;
    username: string;
}

export class LoginUserInfo implements ILoginUserInfo {
    id: number;
    fullName: string;
    username: string;

    constructor(id: number, fullName: string, userName: string) {
        this.id = id;
        this.fullName = fullName;
        this.username = userName;
    }
}

export type LoginInfo = {
    token: string,
    isLoggedIn: boolean
}


export type LoginState = {
    username: string;
    password: string;
    submitted: boolean;
}

export interface TodoDataItem {
    id: number;
    text: string;
    dateAdded: Date;
    completed: boolean;
}
