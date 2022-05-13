import { EmployeesData } from '../db';
import { TIMEZONE } from '../config';

const getEmployeeStatus = (
    employee: EmployeesData, // employee
    existedJobsTime: { [key: string]: number[] }, // hours, when employee already has job: { "1": [8, 10], "2": [10]}
    workingHour: number, // the working start hour
    currentTime: Date, // current time, when request was sended in utc
    workDay: Date, // milliseconds - working day in utc
) => {
    const MAX_DIFFERENCE_IN_SEC = 1440; // 24 minutes
    const currentTimeByTimezone = new Date(currentTime.toLocaleString("en-US", {timeZone: employee.timezone})); // current time, when request was sended in emploees timezone

    const startWorkByEmployeerZone = new Date(
        new Date(workDay.toLocaleString("en-US", {timeZone: employee.timezone})).setHours(workingHour)
    );
    const employeeStartHourByDefaultZone = new Date(
        new Date(startWorkByEmployeerZone.toLocaleString("en-US", {timeZone: TIMEZONE})).setHours(workingHour)
    ).getHours(); // the hour when employee starts work by default timezone
    const endHour = workingHour + 2;
    const diff = (currentTimeByTimezone.getTime() - startWorkByEmployeerZone.getTime()) / 1000;
    // const diff = currentTimeByTimezone - Math.floor(startWorkByEmployeerZone.clone().tz(TIMEZONE).valueOf() / 1000);

    if (
        employeeStartHourByDefaultZone < employee.startTime
        || employeeStartHourByDefaultZone > employee.endTime
        ||( employeeStartHourByDefaultZone > workingHour && employeeStartHourByDefaultZone < endHour)
        ) {
        return 'not working';
    }

    if (existedJobsTime[employee.id]?.includes(workingHour)) {
        return 'unavailable';
    }

    if ( diff > MAX_DIFFERENCE_IN_SEC) {
        return 'expired';
    }
    return 'available'
};

export default getEmployeeStatus;
