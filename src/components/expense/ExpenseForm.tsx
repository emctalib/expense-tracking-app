import React, { FormEvent, FC } from 'react'
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify'
import { ExpenseRowList } from './ExpenseRowList'
import { useDispatch } from 'react-redux';
import { EditExpense, NewExpense } from '../../services/expenses';
import { ExpenseDetail } from '../../data/common';
import { PlusLg } from 'react-bootstrap-icons';
import moment from "moment";
import DateInput from './DateInput';

interface ExpenseFormProps {
    expense?: ExpenseDetail;
    setIsEditing?: Function;
}

const ExpenseForm: FC<ExpenseFormProps> = ({ expense, setIsEditing }) => {
    const expenseTypes = ["Interest expense", "Depreciation expense", "Delivery expense", "Cleaning expense", "Income tax expense", "Utilities expense", "Labor expense"];
    const [rowNumber, setRowNumber] = useState<number>(0);
    const [isNewExpense, setIsNewExpense] = useState(true);
    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<number>();
    const [date, setDate] = useState<Date>();
    const dispatch = useDispatch();

    useEffect(() => {
        if (expense !== undefined) {
            setIsNewExpense(false);
            setAmount(expense.amount);
            setDescription(expense.description);
            setDate(expense.createdAt);
            setRowNumber(expense.row);
        }
        else {
            setIsNewExpense(true);
        }
    }, [expense]);

    const onChaneDateHandler = (e: React.FormEvent<HTMLInputElement>) => {
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
            NewExpense(dispatch, { description: description, amount: amount, createdAt: date });
            e.currentTarget.reset();
        }
        else {

            if (setIsEditing != undefined && expense != undefined) {
                EditExpense(dispatch, { id: expense.id, description: description, amount: amount, createdAt: date });
                setIsEditing(false);
            }
        }
    }

    const onCancelClick = () => {
        if (setIsEditing != undefined)
            setIsEditing(false);
    }

    return (
        <>
            <form onSubmit={onFormSubmit}>
                <div className="row tableBorder">
                    <div className="col-sm-2">
                        {rowNumber == 0 ? "Auto" : rowNumber}
                    </div>
                    <div className="col-sm-2">
                        <DateInput selectedDate={date} onDateChange={onChaneDateHandler}></DateInput>
                    </div>
                    <div className="col-sm-3"><select required className='form-control' onChange={onDescriptionChange} value={description}>
                        <option key={-1}></option>
                        {expenseTypes.map((d, i) => (
                            <option key={i} value={d}>
                                {d}
                            </option>
                        ))}
                    </select></div>
                    <div className="col-sm-3">
                        <input required className='form-control' value={amount} type="number" min="0.00" max="100000.00" step="0.01" onChange={onAmountChange} />
                    </div>
                    <div className="col-sm-2">
                        <div>
                            {
                                isNewExpense ? <>

                                    <button type="submit" className="btn btn-success">
                                        <PlusLg className='text-default'>+</PlusLg>
                                    </button>&nbsp;</> :
                                    <>
                                        <button type="submit" className="btn btn-info">Edit</button>&nbsp;
                                        <button type="button" className="btn btn-default" onClick={onCancelClick}>Cancel</button>
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