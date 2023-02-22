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
import SlideUp, { Border, SlideUpData } from './SlideUp';
import JobInfo from './JobInfo';

export default function CalendarSection() {
    const [year, setYear] = useState(2023);
    const [month, setMonth] = useState(2);
    const [dateArray, setDateArray] = useState<DateArray>([]);
    const [monthJobs, setMonthJobs] = useState<JobType[]>([]);
    const [showBig, setShowBig] = useState(false);
    const [day, setDay] = useState(1);
    const [daysInMonth, setDaysInMonth] = useState(null);
    const [jobForDay, setJobForDay] = useState<JobType[]>([]);
    const [showSlideUp, setShowSlideUp] = useState<SlideUpData>({show: false, header: "N/A", children: null});
    const [slideUpBorderColor, setSlideUpBorderColor] = useState<Border>("black");
    const [closeInternal, setCloseInternal] = useState(false);
    const userData = useSelector((state: Store) => state.userData);
    const [onlyMyJobs, setOnlyMyJobs] = useState(false);

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
        setDaysInMonth(daysInAMonth);

        if (day===0) {
            setDay(daysInAMonth);
        }
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
            setJobForDay(data.jobs.filter(job => job.day === day));
        }
      }, [nextMonthJobs.status, nextMonthJobs.data]);

    useEffect(changeDateArray, [year, month]);

    useEffect(() => {
        setJobForDay(monthJobs.filter(job => job.day === day));
    }, [day]);

    function clicked(givenDay: number) {
        setDay(givenDay);
        setShowBig(true);
    }

    function yesterday() {
        if (day === 1) {
            setDay(day-1);
            changeMonth("right");
            return
        }
        setDay(day-1);
    }

    function tomorrow() {
        if (day >= daysInMonth) {
            setDay(1);
            changeMonth("left");
            return
        }
        setDay(day+1);
    }

    function jobClicked(job: JobType) {
        const type = JSON.parse(job.volunteer);
        let color: Border = "yellow";
        let myJob = false;
        if (Array.isArray(type)) {
			let positions = 0;
			for (let i=0;i<type.length;i++) {
				//@ts-ignore
				positions+=type[i].positions;
                if (type[i].userId === userData.ID) {
                    myJob = true;
                }
			}
			if (positions === job.positions) {
				color = "red";
			}
		} else {
            color = "blue";
		}
        setSlideUpBorderColor(color);
        setShowSlideUp({ show: true, header: job.jobTitle, children: <JobInfo changeBorder={borderChange} id={job.ID} myJob={myJob} close={() => setCloseInternal(true)} baseInfo={job}/> });
    }

    function borderChange(color: Border) {
        console.log("Changing color to "+ color);
        setSlideUpBorderColor(color);
    }

    return (
        <View style={{width: "100%",height:"100%"}}>
            {showBig ? <BigDate myJobToggle={setOnlyMyJobs} myJobShow={onlyMyJobs} clicked={jobClicked} close={() => setShowBig(false)} month={month} day={day} year={year} left={yesterday} right={tomorrow} jobs={jobForDay} /> : null}
            <Calendar myJobToggle={setOnlyMyJobs} myJobShow={onlyMyJobs} changeMonth={changeMonth} dateArray={dateArray} year={year} month={monthToLetterFull[month]} monthIndex={month} monthJobs={monthJobs} clicked={clicked}/>
            {showSlideUp.show ? 
                <SlideUp closeInternal={closeInternal} border={slideUpBorderColor} close={() => {setShowSlideUp({...showSlideUp, show: false}),setCloseInternal(false)}} header={showSlideUp.header}>
                    {showSlideUp.children}
                </SlideUp>
            : null}
        </View>
    )
}