import { getDaysInAmonth, monthToLetterFull } from '../functions/dateConversion';
import { getJobsByDate, GetJobsResponse, JobType } from '../functions/jobFetch';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { useQuery } from 'react-query';
import { Store } from '../redux/types';
import Calendar, { DateArray } from './Calendar';
import { setLoading } from '../redux/actions';
import BigDate from './BigDate';

export default function CalendarSection() {
    const [year, setYear] = useState(2023);
    const [month, setMonth] = useState(2);
    const [dateArray, setDateArray] = useState<DateArray>([]);
    const [monthJobs, setMonthJobs] = useState<JobType[]>([]);

    const dispatch = useDispatch();

    const token = useSelector((state: Store) => state.token);
    const nextMonthJobs = useQuery<GetJobsResponse, Error>([`jobFetch${month}${year}`], () => getJobsByDate(token, month, year), { staleTime: 30000, refetchInterval: 30000 });

    function changeDateArray() {
        const date = new Date(year, month-1, 1);
        const dayOfFirstDate = date.getDay();
        const daysInAMonth = getDaysInAmonth(year, month);
        const daysInPrevMonth = getDaysInAmonth(month<1?year:year-1, month>1?month-1:12);

        let calendarFormatedDateArray: DateArray = [];
        for (let i=1;i<=dayOfFirstDate;i++) calendarFormatedDateArray.unshift({day: daysInPrevMonth-i, month: month-1});
        for (let i=1;i<=daysInAMonth;i++) calendarFormatedDateArray.push({day: i, month});
        for (let i=1;i<=(calendarFormatedDateArray.length >= 36 ? 42 : 35)-dayOfFirstDate-daysInAMonth;i++) calendarFormatedDateArray.push({day: i, month: month+1});

        setDateArray(calendarFormatedDateArray);
    }

    function changeMonth(direction: "left" | "right"): void {
        console.log(direction)
        dispatch(setLoading("Loading"));
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

    useEffect(() => {
        const { data, status } = nextMonthJobs;
        if (status === "loading") {
            dispatch(setLoading("Loading"));
        } else {
            dispatch(setLoading(null));
        }
        if (status !== "success") return
        console.log(`Fetched jobs for ${month}, ${year}.`);
        if (data.jobs) {
            setMonthJobs(data.jobs);
        }
      }, [nextMonthJobs.status, nextMonthJobs.data]);

    useEffect(changeDateArray, [year, month]);

    function clicked(day: number) {
        console.log(`Tile ${day} clicked.`);
    }

    return (
        <View style={{width: "100%",height:"100%"}}>
            {/* <BigDate /> */}
            <Calendar changeMonth={changeMonth} dateArray={dateArray} year={year} month={monthToLetterFull[month]} monthIndex={month} monthJobs={monthJobs} clicked={clicked}/>
        </View>
    )
}