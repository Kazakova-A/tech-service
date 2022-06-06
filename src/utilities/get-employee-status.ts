import * as moment from 'moment-timezone';

import { EmployeesData } from '../db';
import { TIMEZONE } from '../config';

const getEmployeeStatus = (
    employee: EmployeesData, // employee
    existedJobsTime: { [key: string]: number[] }, // hours, when employee already has job: { "1": [8, 10], "2": [10]}
    workingHour: number, // the working start hour
    currentTime: number, // current time, when request was sended in utc
    workDay: number, // milliseconds - working day in utc
) => {
    const MAX_DIFFERENCE_IN_SEC = 1440; // 24 minutes

    const currentTimeByTimezone = moment(currentTime * 1000).tz(employee.timezone).valueOf() / 1000; // current time, when request was sended in emploees timezone

    const momentWorkDay = moment(workDay * 1000);

    const startWorkByEmployeerZone = momentWorkDay.clone().tz(employee.timezone).startOf("day").add(workingHour, 'hours');
    const employeeStartHourByDefaultZone = startWorkByEmployeerZone.clone().tz(TIMEZONE).hours(); // the hour when employee starts work by default timezone
    const endHour = workingHour + 2;
    const diff = currentTimeByTimezone - Math.floor(startWorkByEmployeerZone.clone().tz(TIMEZONE).valueOf() / 1000);

    if (
        employeeStartHourByDefaultZone < employee.startTime
        || employeeStartHourByDefaultZone > employee.endTime
        || (employeeStartHourByDefaultZone > workingHour && employeeStartHourByDefaultZone < endHour)
    ) {
        return 'not working';
    }

    if (existedJobsTime[employee.id]?.includes(workingHour)) {
        return 'unavailable';
    }

    if (diff < MAX_DIFFERENCE_IN_SEC) {
        return 'expired';
    }
    return 'available'
};

export default getEmployeeStatus;
