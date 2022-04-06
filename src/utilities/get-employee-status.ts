import { EmployeesData } from '../db';

const getEmployeeStatus = (
    employee: EmployeesData,
    workTime: { [key: string]: number[] },
    time: number
) => {
    if (time < employee.startTime || time > employee.endTime) {
        return 'not working'
    }

    if (workTime[employee.id]?.includes(time)) {
        return 'unavailable'
    }

    return 'available'
};

export default getEmployeeStatus;
