import {
    newExpense, editExpense, deleteExpense, setExpense,
    setExpenseError, newExpenseError, editExpenseError, deleteExpenseError
} from "../slices/expenseSlice";
import { toast } from 'react-toastify';

const ToastMiddleware = () => (next: any) => (action: any) => {
    switch (action.type) {
        case newExpense.type:
            toast.success("New expense added successfully.");
            break;

        case editExpense.type:
            toast.success("Expense edited successfully.");
            break;

        case deleteExpense.type:
            toast.success("Expense deleted successfully.");
            break;

        case newExpenseError.type:
            toast.success("Error adding new expense.");
            break;

        case editExpenseError.type:
            toast.error("Error editing expense.");
            break;

        case deleteExpenseError.type:
            toast.error("Error deleting expense.");
            break;

        case setExpenseError.type:
            toast.error("Error loading expenses.");
            break;

        case setExpense.type:
            toast.info("Expense loaded.");
            break;

        default:
            break;
    }
    return next(action);
}

export default ToastMiddleware;