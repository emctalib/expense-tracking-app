import React, { FC } from 'react';
import { ExpenseDetail } from '../../slices/common';

interface Props {
    expenses: ExpenseDetail[];
}

export const ExpenseTotal: FC<Props> = ({ expenses }) => {
    const totalAmount = expenses.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);

    return <>Grand Total: ${Math.round(totalAmount * 100) / 100.0}</>;
};
