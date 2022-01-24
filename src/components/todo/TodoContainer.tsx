import React, { useState, useRef, useEffect } from 'react';
import { GetTodosItems } from '../../services/todos';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { TodoDataItem } from '../../slices/common';
import TodoList from './TodoList';
import AddTodoItem from './AddTodoItem';

export const TodoContainer = () => {
    const isInit = useRef<boolean>(false);
    const [data, setData] = useState<TodoDataItem[]>([{ 'id': 1324, 'text': 'Perameles nasuta', 'dateAdded': new Date("1/1/2019"), 'completed': true }]);
    useEffect(() => {
        if (isInit.current == false) {
            GetTodosItems().then((r: TodoDataItem[]) => {
                setData(r);
                isInit.current = true;
            })
        }
    }, [data])

    const addNewItemHandler = (item: TodoDataItem) => {
        if (data !== undefined) {
            var maxId = Math.max.apply(Math, data.map(function (o) { return o.id; }));
            item.id = maxId + 1;
            item.dateAdded = new Date("1/1/2019");
            item.completed = false;

            setData(data => [item, ...data])
        }
    }

    const deleteItemHandler = (id: number) => {
        if (data !== undefined) {
            setData(data => data.filter((d) => d.id != id))
            //setData(data => data.splice(data.findIndex((d) => d.id == id) - 1, 1));
        }
    }

    const markCompletedItemHandler = (id: number) => {
        if (data !== undefined) {
            setData(data => data.map((d) => {
                if (d.id == id) {
                    var b = !d.completed;
                    d.completed = b;
                }
                return d;
            }));

        }
    }


    return (
        <>
            <div className='container'>
                <div className='pt-3 jumbotron'>
                    <h2>Manage Your Todos</h2>
                    <hr style={{ border: '1px solid grey' }} />
                    <div className='row'>
                        <AddTodoItem onAddNewItem={addNewItemHandler}></AddTodoItem>
                    </div>
                    <div>
                        <TodoList title='Todos' list={data} onDeleteItem={deleteItemHandler} onMarkCompletedItem={markCompletedItemHandler}></TodoList>
                    </div>
                </div>
            </div>
        </>
    )
}
