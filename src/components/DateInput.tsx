import React, { FC } from "react";
import moment from "moment";

interface DateInputProps {
    selectedDate?: Date;
    onDateChange: Function;
}

const DateInput: FC<DateInputProps> = ({ selectedDate, onDateChange }) => {
    return (
        <>
            <input
                type="date"
                className="form-control"
                onChange={(e) => onDateChange(e)}
                value={selectedDate != undefined ? moment(selectedDate).format("YYYY-MM-DD") : ""}
                name="date"
                id="date"
                placeholder="Enter date"
                required
            />
        </>
    )
}

export default DateInput;
