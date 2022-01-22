import React, { FormEvent, FC } from 'react'
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify'
import { ExpenseList } from './ExpenseList'
import { useDispatch } from 'react-redux';
import { NewExpense } from '../services/expenses';
import { ExpenseDetail } from '../data/common';


interface ExpenseFormProps {
    //  expense: Expense;
    //  setIsEditing: Function;
    title: string
}

const ExpenseForm: FC<ExpenseFormProps> = ({ title }) => {
    //const ExpenseForm: FC<ExpenseFormProps> = ({ expense, setIsEditing }) => {
    const descriptions = ["Interest expense", "Depreciations expense", "Delivery expense", "Cleaning expense", "Income tax expense", "Utilities expense", "Labor expense"];
    const [isNewExpense, setIsNewExpense] = useState(true);
    const [description, setDescription] = useState<string>(descriptions[0]);
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState<Date>();
    const dispatch = useDispatch();

    /*
    useEffect(() => {

    }, [expense]);
*/

    const onDateChange = (e: React.FormEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        setDate(new Date(newValue));
    }
    const onAmountChange = (e: React.FormEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        setAmount(Number(newValue));
    }
    const onDescriptionChange = (e: React.FormEvent<HTMLSelectElement>) => {
        const newValue = e.currentTarget.value;
        setDescription(newValue);
    }
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isNewExpense) {

            NewExpense(dispatch, { description: description, amount: amount, date: date });
            e.currentTarget.reset();
            //this.myFormRef.reset()
            //    setAmount(0)
            //   setDescription("")
            //setDate(null || undefined)
            // alert(date)
        }
        else {

        }
    }

    return (
        <>
            <form onSubmit={onFormSubmit}>
                <div className="row tableBorder">
                    <div className="col-sm-2">Auto</div>
                    <div className="col-sm-2"><input required className='form-control' type="date" onChange={onDateChange} /></div>
                    <div className="col-sm-3"><select required className='form-control' onChange={onDescriptionChange}>
                        <option key={-1}></option>
                        {descriptions.map((d, i) => (
                            <option key={i} value={d}>
                                {d}
                            </option>
                        ))}
                    </select></div>
                    <div className="col-sm-3"><input required className='form-control' type="number" min="0.00" max="100000.00" step="0.01" onChange={onAmountChange} /></div>
                    <div className="col-sm-2">
                        <div>
                            {
                                isNewExpense ? <><button type="submit" className="btn btn-success">Add</button>&nbsp;</> :
                                    <>
                                        <button type="submit" className="btn btn-info">Edit</button>&nbsp;
                                        <button type="button" className="btn btn-danger">Delete</button>
                                        <button type="button" className="btn btn-default">Cancel</button>
                                    </>
                            }
                        </div>

                    </div>
                </div>
            </form>
        </>
    )
}

export default ExpenseForm;