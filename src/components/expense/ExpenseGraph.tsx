import React, { FC } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ExpenseDetail } from '../../slices/common';


ChartJS.register(ArcElement, Tooltip, Legend);


interface Props {
    expenses: ExpenseDetail[];
}

export const ExpenseGraph: FC<Props> = ({ expenses }) => {
    let cloneArray = [...expenses];
    let sumByType = [] as ExpenseDetail[];
    cloneArray.reduce(function (res: any, value: any) {
        if (!res[value.description]) {
            res[value.description] = { description: value.description, amount: 0 };
            sumByType.push(res[value.description])
        }
        res[value.description].amount += value.amount;
        return res;
    }, {});

    /*
    const groupBy = (xs: any, key: any) => {
        return xs.reduce(function (rv: any, x: any) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };
    let g = groupBy(expenses, "description").length;
    */

    const data = {
        labels: sumByType.map((d) => d.description),
        datasets: [
            {
                label: 'Amount Spent',
                data: sumByType.map((d) => d.amount),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <>
        <div>
            <Pie data={data} />
        </div>
    </>;
};