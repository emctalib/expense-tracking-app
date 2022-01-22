import React, { FC, useEffect, useState } from 'react'
import { ExpenseDetail } from '../data/common';
import { useDispatch, useSelector } from 'react-redux';
import { GetExpenses } from '../services/expenses';
import { RootState } from '../data/store';

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

    return (
        <>
            {
                console.log("rendering ListRow.")
            }
            <div className="row tableBorder">
                <div className="col-sm-2">{expense.row}</div>
                <div className="col-sm-2">{new Date(expense.expdate).toLocaleDateString()}</div>
                <div className="col-sm-3">{expense.description}</div>
                <div className="col-sm-3">${expense.amount}</div>
                <div className="col-sm-2">  <button type="button" className="btn btn-warning" onClick={() => setIsEditing(!isEditing)}>Edit</button></div>
            </div>
            <hr style={{ border: '1px solid grey' }} />
        </>
    )

}
