import CSS from 'csstype';

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
    username: string,
    fullName: string,
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


export enum SiteTheme {
    classic,
    light,
    dark

}

export class ThemeGenerator {
    static getTheme = (theme: SiteTheme): ThemeItems => {
        switch (theme) {
            case SiteTheme.classic:
                return {
                    Header: {
                        backgroundColor: 'lightblue'
                    },
                    Footer: {
                        backgroundColor: 'lightblue'
                    },
                    Title: {
                        color: 'white'
                    }
                } as ThemeItems;
            case SiteTheme.light:
                return {
                    Header: {
                        backgroundColor: 'lightgray'
                    },
                    Footer: {
                        backgroundColor: 'lightgray'
                    },
                    Title: {
                        color: '#212529'
                    }
                } as ThemeItems;
            case SiteTheme.dark:
                return {
                    Header: {
                        backgroundColor: '#212529'
                    },
                    Footer: {
                        backgroundColor: '#212529'
                    },
                    Title: {
                        color: 'white'
                    }
                } as ThemeItems;
        }
    }
}

export interface ThemeItems {
    Header: CSS.Properties;
    Footer: CSS.Properties;
    Title: CSS.Properties;
}

