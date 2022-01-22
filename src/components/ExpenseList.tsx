import React, { FC, useEffect, useState } from 'react'
import { ExpenseDetail } from '../data/common';
import { useDispatch, useSelector } from 'react-redux';
import { GetExpenses, DeleteExpense } from '../services/expenses';
import { RootState } from '../data/store';
import { XLg, Pencil } from 'react-bootstrap-icons';
import ExpenseForm from './ExpenseForm';

export const ExpenseList: FC = () => {
    const dispatch = useDispatch();
    //const expenses = useSelector((state: RootStateOrAny) => state.expenseSlice.expenses);
    const expenses = useSelector((state: RootState) => state.expensesSlice.expenses);

    useEffect(() => {
        console.log("rendering ExpenseList.");
        GetExpenses(dispatch);
    }, []); //[] param to control when component will rerender. it will not render as its blank array.

    return <>
        {
            expenses.map(e =>
                <div key={e.id} style={{ marginBottom: '1rem' }}>
                    <ListRow expense={e} />
                </div>
            )
        }
    </>
}


interface ListRowProps {
    expense: ExpenseDetail;
}


const ListRow: FC<ListRowProps> = ({ expense }) => {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();

    const onDeleteClick = (e: React.FormEvent<HTMLButtonElement>) => {
        if (window.confirm('Are you sure you want to delete selected record?')) {
            DeleteExpense(dispatch, expense);
        }
    }

    const amountSizeCss = () => {
        if (expense.amount <= 100)
            return "greenAmount";
        if (expense.amount >= 10000)
            return "redAmount";
        return "";
    }

    return (
        !isEditing ?
            <>
                {
                    console.log("rendering ListRow.")
                }
                <div className="row tableBorder">
                    <div className="col-sm-2">{expense.row}</div>
                    <div className="col-sm-2">{new Date(expense.createdAt).toLocaleDateString()}</div>
                    <div className="col-sm-3">{expense.description}</div>
                    <div className="col-sm-3"><span className={amountSizeCss()}>${expense.amount}</span>
                    </div>
                    <div className="col-sm-2">
                        <button type="button" className="btn btn-info" onClick={() => setIsEditing(!isEditing)}>
                            <Pencil className='text-default'>x</Pencil></button>&nbsp;
                        <button type="button" className="btn btn-danger" onClick={onDeleteClick}>
                            <XLg className='text-default'>x</XLg>
                        </button>
                    </div>
                </div>
                <hr style={{ border: '1px solid grey' }} />
            </>
            : <>
                <ExpenseForm expense={expense} setIsEditing={setIsEditing} />
            </>
    )

}
