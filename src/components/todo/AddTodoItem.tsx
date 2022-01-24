import React, { useState, useEffect, FC } from 'react';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { TodoDataItem } from '../../slices/common';

interface AddTodoItemProps {
    onAddNewItem: Function;
}

const AddTodoItem: FC<AddTodoItemProps> = ({ onAddNewItem }) => {

    const [text, setText] = useState<string>("");

    const onTextChange = (e: React.FormEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        setText(newValue);
    }
    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAddNewItem({ id: 0, text: text } as TodoDataItem);
        e.currentTarget.reset();
    }

    return (
        <>
            <form className="form-inline" onSubmit={onFormSubmit}>
                <div className="  mb-3 w-75 mx-auto">
                    <label className="sr-only" htmlFor="tbTodo"><b>Todo:</b></label>
                    <input type="text" required className="form-control mb-2 mr-sm-2" onChange={onTextChange} id="tbTodo" placeholder="Enter yor todo here." />
                    <button type="submit" className="btn btn-primary mb-2">Add</button>
                </div>
            </form>
        </>
    );
};

export default AddTodoItem;