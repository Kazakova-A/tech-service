import * as moment from 'moment-timezone';

const getWorkingHours = (jobsArr: any[]) => (jobsArr.reduce((accum, item) => {
    const scheduledStart = new Date(Number(item.scheduledStart * 1000))
    const scheduledStartHour = moment(scheduledStart).utc().hour();

    

    if (accum[item.employeeId]) {
        accum[item.employeeId] = [...accum[item.employeeId], scheduledStartHour]
    }
    else {
        accum[item.employeeId] = [scheduledStartHour]
    }
    return accum;
}, {}))

export default getWorkingHours;
