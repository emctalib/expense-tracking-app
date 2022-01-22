import {
    newExpense, editExpense, deleteExpense, setExpense,
    setExpenseError, newExpenseError, editExpenseError, deleteExpenseError
} from "../data/expenseSlice";
import { ExpenseDetail } from '../data/common';


export let expenses: ExpenseDetail[] = [
    { "id": 1, expdate: "2015-03-25", "row": 1, "description": "Interest expense", "amount": 622 },
    { "id": 2, expdate: "2015-03-25", "row": 2, "description": "Depreciations expense", "amount": 682 },
    { "id": 3, expdate: "2015-03-25", "row": 3, "description": "Delivery expense", "amount": 864 },
    { "id": 4, expdate: "2015-03-25", "row": 4, "description": "Interest expense", "amount": 953 },
    { "id": 5, expdate: "2015-03-25", "row": 5, "description": "Cleaning expense", "amount": 897 },
    { "id": 6, expdate: "2015-03-25", "row": 6, "description": "Income tax expense", "amount": 150 },
    { "id": 7, expdate: "2015-03-25", "row": 7, "description": "Utilities expense", "amount": 950 },
    { "id": 8, expdate: "2015-03-25", "row": 8, "description": "Cleaning expense", "amount": 687 },
    { "id": 9, expdate: "2015-03-25", "row": 9, "description": "Delivery expense", "amount": 123 },
    { "id": 10, expdate: "2015-03-25", "row": 10, "description": "Interest expense", "amount": 754 },
    { "id": 11, expdate: "2015-03-25", "row": 11, "description": "Income tax expense", "amount": 471 },
    { "id": 12, expdate: "2015-03-25", "row": 12, "description": "Interest expense", "amount": 903 },
    { "id": 13, expdate: "2015-03-25", "row": 13, "description": "Utilities expense", "amount": 149 },
    { "id": 14, expdate: "2015-03-25", "row": 14, "description": "Cleaning expense", "amount": 306 },
    { "id": 15, expdate: "2015-03-25", "row": 15, "description": "Utilities expense", "amount": 182 },
    { "id": 16, expdate: "2015-03-25", "row": 16, "description": "Income tax expense", "amount": 988 },
    { "id": 17, expdate: "2015-03-25", "row": 17, "description": "Depreciation expense", "amount": 729 },
    { "id": 18, expdate: "2015-03-25", "row": 18, "description": "Utilities expense", "amount": 481 },
    { "id": 19, expdate: "2015-03-25", "row": 19, "description": "Interest expense", "amount": 644 },
    { "id": 20, expdate: "2015-03-25", "row": 20, "description": "Utilities expense", "amount": 951 },
    { "id": 21, expdate: "2015-03-25", "row": 21, "description": "Depreciation expense", "amount": 278 },
    { "id": 22, expdate: "2015-03-25", "row": 22, "description": "Cleaning expense", "amount": 215 },
    { "id": 23, expdate: "2015-03-25", "row": 23, "description": "Cleaning expense", "amount": 912 },
    { "id": 24, expdate: "2015-03-25", "row": 24, "description": "Depreciation expense", "amount": 425 },
    { "id": 25, expdate: "2015-03-25", "row": 25, "description": "Interest expense", "amount": 310 },
    { "id": 26, expdate: "2015-03-25", "row": 26, "description": "Labor expense", "amount": 598 }];

export const GetExpenses = async (dispatch: any) => {
    try {
        //(typeof expenses[0].id)
        //alert(typeof expenses[0].expdate)
        // alert(typeof expenses[0].amount)
        dispatch(setExpense(expenses));
    }
    catch {
        dispatch(setExpenseError());
    }
}

export const NewExpense = async (dispatch: any, expense: any) => {
    try {
        dispatch(newExpense(expense));
        console.log("added");
    }
    catch {
        dispatch(setExpenseError());
    }
}


