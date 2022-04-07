import * as moment from 'moment';

import { EmployeesData } from '../db';

const getEmployeeStatus = (
    employee: EmployeesData,
    existedJobsTime: { [key: string]: number[] },
    workHour: number, 
    currentTime: number,
    workDay: number,
) => {
    const MAX_DIFFERENCE_IN_SEC = 1440; // 24 minutes
    const startWorkTime = moment(workDay * 1000).add(workHour, 'hours').valueOf() / 1000;
    const diff = currentTime -  Math.floor(startWorkTime);

    if (workHour < employee.startTime || workHour > employee.endTime) {
        return 'not working';
    }

    if( diff  > MAX_DIFFERENCE_IN_SEC) {
        return 'expired';
    }

    if (existedJobsTime[employee.id]?.includes(workHour)) {
        return 'unavailable';
    }

    return 'available'
};

export default getEmployeeStatus;
