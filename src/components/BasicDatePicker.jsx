/*========================================================

This is almost completely unchanged from the example datepicker for materialui

TODO

this needs to be redone


this file adds 174.95 Kb to the total project size... something needs to change
========================================================*/


import * as React from 'react';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function ControlledComponent(props) {
    const {curDate, setCurDate} = props;
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                {/*It may be better to move the function for readibilty */}
                <DatePicker value={curDate} onChange={(newValue) => setCurDate(newValue)}  slotProps={{ textField: { size: 'small' } }} />
            </DemoContainer>
        </LocalizationProvider>
    );
}