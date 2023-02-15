import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Calendar from './Calendar'
import { getDaysInAmonth, monthToLetterFull } from '../functions/dateConversion';

export default function CalendarSection() {
    const [year, setYear] = useState(2023);
    const [month, setMonth] = useState(2);
    const [dateArray, setDateArray] = useState<number[]>([]);

    function changeDateArray() {
        const date = new Date(year, month-1, 1);
        const dayOfFirstDate = date.getDay();
        const daysInAMonth = getDaysInAmonth(year, month);
        const daysInPrevMonth = getDaysInAmonth(month<1?year:year-1, month>1?month-1:12);

        let calendarFormatedDateArray = [];
        for (let i=1;i<=dayOfFirstDate;i++) calendarFormatedDateArray.unshift(daysInPrevMonth-i);
        for (let i=1;i<=daysInAMonth;i++) calendarFormatedDateArray.push(i);
        if (calendarFormatedDateArray.length !==35) {
            for (let i=1;i<=35-dayOfFirstDate-daysInAMonth;i++) calendarFormatedDateArray.push(i);
        }

        console.log(calendarFormatedDateArray);
        setDateArray(calendarFormatedDateArray);
    }

    function changeMonth(direction: "left" | "right"): void {
        console.log(direction)
        if (direction ==="left") {
            if (month===12) {
                setYear(year+1);
                setMonth(1);
                return;
            }
            setMonth(month+1);
            return
        }
        if (month===1) {
            setYear(year-1);
            setMonth(12);
            return;
        }
        setMonth(month-1);
    }

    useEffect(changeDateArray, [year, month]);


    return (
        <View>
            <Calendar changeMonth={changeMonth} dateArray={dateArray} year={year} month={monthToLetterFull[month]} />
        </View>
    )
}