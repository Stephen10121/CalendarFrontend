import { getDaysInAmonth, monthToLetterFull } from '../functions/dateConversion';
import { getJobsByDate, GetJobsResponse, JobType } from '../functions/jobFetch';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { useQuery } from 'react-query';
import { Store } from '../redux/types';
import Calendar from './Calendar';
import { setLoading } from '../redux/actions';

export default function CalendarSection() {
    const [year, setYear] = useState(2023);
    const [month, setMonth] = useState(2);
    const [dateArray, setDateArray] = useState<number[]>([]);
    const [monthJobs, setMonthJobs] = useState<JobType[]>([]);

    const dispatch = useDispatch();

    const token = useSelector((state: Store) => state.token);
    const nextMonthJobs = useQuery<GetJobsResponse, Error>([`jobFetch${month}${year}`], () => getJobsByDate(token, month, year), { staleTime: 30000, refetchInterval: 30000 });

    function changeDateArray() {
        const date = new Date(year, month-1, 1);
        const dayOfFirstDate = date.getDay();
        const daysInAMonth = getDaysInAmonth(year, month);
        const daysInPrevMonth = getDaysInAmonth(month<1?year:year-1, month>1?month-1:12);

        let calendarFormatedDateArray = [];
        for (let i=1;i<=dayOfFirstDate;i++) calendarFormatedDateArray.unshift(daysInPrevMonth-i);
        for (let i=1;i<=daysInAMonth;i++) calendarFormatedDateArray.push(i);
        for (let i=1;i<=(calendarFormatedDateArray.length >= 36 ? 42 : 35)-dayOfFirstDate-daysInAMonth;i++) calendarFormatedDateArray.push(i);

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
        }
        if (status !== "success") return
        dispatch(setLoading(null));
        console.log(`Fetched jobs for ${month}, ${year}.`);
        if (data.jobs) {
            setMonthJobs(data.jobs);
        }
      }, [nextMonthJobs.status, nextMonthJobs.data]);

    useEffect(changeDateArray, [year, month]);


    return (
        <View>
            <Calendar changeMonth={changeMonth} dateArray={dateArray} year={year} month={monthToLetterFull[month]} monthJobs={monthJobs} />
        </View>
    )
}