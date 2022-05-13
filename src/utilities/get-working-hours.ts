import { TIMEZONE } from '../config';

const getWorkingHours = (jobsArr: any[]) => (jobsArr.reduce((accum, item) => {
    const scheduledStart = new Date( item.scheduledStart )
    const scheduledStartHour = new Date(scheduledStart.toLocaleString("en-US", {timeZone: TIMEZONE})).getHours();;

    if (accum[item.employeeId]) {
        accum[item.employeeId] = [...accum[item.employeeId], scheduledStartHour]
    }
    else {
        accum[item.employeeId] = [scheduledStartHour]
    }
    return accum;
}, {}))

export default getWorkingHours;
