import React, { useState, useEffect, FC } from 'react';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { TodoDataItem } from '../../slices/common';

interface TodoItemProps {
    item: TodoDataItem;
    onDeleteItem: Function;
    onMarkCompletedItem: Function;
}

const TodoItem: FC<TodoItemProps> = ({ item, onDeleteItem, onMarkCompletedItem }) => {

    const onDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
        if (window.confirm('Are you sure to delete?'))
            onDeleteItem(item.id);
    }

    const onMarkCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
        onMarkCompletedItem(item.id);
    }

    return (
        <>
            <div className="card border-primary mb-3 w-75 mx-auto">
                <div className="card-body text-defult">
                    <div className="card-text">
                        <b>ID: {item.id}</b> {item.text}
                        <div className="card-text text-muted">{new Date(item.dateAdded).toLocaleDateString()}</div>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" onChange={onMarkCompleted} type="checkbox" id="cbComplete" defaultChecked={item.completed} />
                        <label className="form-check-label" label-for="cbComplete">
                            <small className="text-muted">Mark as Completed!</small>
                        </label>
                    </div>
                    <div className='text-end'>
                        <button className='btn btn-danger' onClick={onDeleteClick}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TodoItem;