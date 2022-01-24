import React, { useState, useEffect, FC } from 'react';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { TodoDataItem } from '../../slices/common';
import TodoItem from './TodoItem';

interface TodoListProps {
    title: string;
    onDeleteItem: Function;
    onMarkCompletedItem: Function;
    list?: TodoDataItem[];
}

const TodoList: FC<TodoListProps> = ({ title, list, onDeleteItem, onMarkCompletedItem }) => {
    return (
        <>
            {
                list && list.length > 0 && list.map((item, key) =>
                    <TodoItem item={item} key={key} onDeleteItem={onDeleteItem} onMarkCompletedItem={onMarkCompletedItem}></TodoItem>
                )
            }
        </>
    );
};

export default TodoList;