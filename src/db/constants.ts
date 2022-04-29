import * as moment from 'moment-timezone';

import { JobStatuses } from './types';

export const BRANDS = [
    'asko',
    'aga',
    'american_range',
    'alfresco',
    'bertazzoni',
    'blomberg',
    'blue_star',
    'bosch',
    'cafe',
    'capital',
    'cove',
    'coyote',
    'dacor',
    'dcs',
    'electrolux',
    'elica',
    'fisher_&_paykel',
    'frigidaire',
    'gaggenau',
    'la_cornue',
    'lg',
    'lynx',
    'liebher',
    'marvel',
    'miele',
    'maytag',
    'monogram',
    'perlick',
    'rcs',
    'samsung',
    'signature',
    'smeg',
    'speed_queen',
    'sub_zero',
    'superiore',
    'thor',
    'vent_a_hood',
    'verona',
    'viking',
    'whirlpool',
    'wolf',
    'zephyr',
    'zline',
]

export const TYPES = [
    'refrigerator',
    'freezer',
    'dryer',
    'wine_cooler',
    'microwave',
    'range',
    'cooktop',
    'vent_hood',
    'dishwasher',
    'washer',
    'oven',
    'garbage_disposal',
]

export const DEFAULT_ZIP = 94022;
const now = new Date();

const spentTime = () => Math.floor(Math.random() * 40) + 40;

console.log(spentTime());

export const JOBS_MOCK_DATA: any[] = [
    {
        customerId: 2,
        workStatus: JobStatuses.scheduled,
        startedAt: null,
        completedAt: null,
        brand: BRANDS[1],
        scheduledStart: (moment.utc(now).startOf('day').add(5, 'hours').valueOf() / 1000), // today 5:00 in utc
        scheduledEnd: (moment.utc(now).startOf('day').add(7, 'hours').valueOf() / 1000), // today 7:00 in utc
        diagnosticSpentTime: spentTime(),
        technicTypes: TYPES[1],
        employeeId: 1,
    },
    {
        customerId: 1,
        workStatus: JobStatuses.scheduled,
        startedAt: null,
        completedAt: null,
        brand: BRANDS[3],
        scheduledStart: (moment.utc(now).startOf('day').add(5, 'hours').valueOf() / 1000), // today 5:00 in utc
        scheduledEnd: (moment.utc(now).startOf('day').add(7, 'hours').valueOf() / 1000), // today 7:00 in utc
        diagnosticSpentTime: spentTime(),
        technicTypes: TYPES[2],
        employeeId: 2,
    },
    {
        customerId: 3,
        workStatus: JobStatuses.scheduled,
        startedAt: null,
        completedAt: null,
        brand: BRANDS[2],
        scheduledStart: (moment.utc(now).startOf('day').add(5, 'hours').valueOf() / 1000), // today 5:00 in utc
        scheduledEnd: (moment.utc(now).startOf('day').add(7, 'hours').valueOf() / 1000), // today 7:00 in utc
        diagnosticSpentTime: spentTime(),
        technicTypes: TYPES[3],
        employeeId: 3,
    },
    {
        customerId: 4,
        workStatus: JobStatuses.scheduled,
        startedAt: null,
        completedAt: null,
        brand: BRANDS[5],
        scheduledStart: (moment.utc(now).startOf('day').add(5, 'hours').valueOf() / 1000), // today 5:00 in utc
        scheduledEnd: (moment.utc(now).startOf('day').add(7, 'hours').valueOf() / 1000), // today 7:00 in utc
        diagnosticSpentTime: spentTime(),
        technicTypes: TYPES[4],
        employeeId: 4,
    },
    {
        customerId: 5,
        workStatus: JobStatuses.scheduled,
        startedAt: null,
        completedAt: null,
        brand: BRANDS[6],
        scheduledStart: (moment.utc(now).startOf('day').add(5, 'hours').valueOf() / 1000), // today 5:00 in utc
        scheduledEnd: (moment.utc(now).startOf('day').add(7, 'hours').valueOf() / 1000), // today 7:00 in utc
        diagnosticSpentTime: spentTime(),
        technicTypes: TYPES[5],
        employeeId: 6,
    },
    {
        customerId: 6,
        workStatus: JobStatuses.scheduled,
        startedAt: null,
        completedAt: null,
        brand: BRANDS[7],
        scheduledStart: (moment.utc(now).startOf('day').add(5, 'hours').valueOf() / 1000), // today 5:00 in utc
        scheduledEnd: (moment.utc(now).startOf('day').add(7, 'hours').valueOf() / 1000), // today 7:00 in utc
        diagnosticSpentTime: spentTime(),
        technicTypes: TYPES[6],
        employeeId: 5,
    },
]


// export const JOBS_MOCK_DATA: any[] = [
//     {
//         invoiceNumber: '3882',
//         description: 'Online Booking - Diagnistic',
//         note: null,
//         workStatus: JobStatuses.scheduled,
//         onMyWayAt: null,
//         startedAt: null,
//         completedAt: null,
//         scheduledStart: 1651294800, // 30.04. 8:00
//         scheduledEnd: 1651302000, // 30.04. 10:00
//         arrivalWindow: 120,
//         totalAmount: 7500,
//         outstandingBalance: 7500,
//         // employeeId: 1,
//     },
//     {
//         invoiceNumber: '3882',
//         description: 'Online Booking - Diagnistic',
//         note: null,
//         workStatus: JobStatuses.scheduled,
//         onMyWayAt: null,
//         startedAt: null,
//         completedAt: null,
//         scheduledStart: 1651302000, // 30.04. 10:00
//         scheduledEnd: 1651309200, // 30.04. 12:00
//         arrivalWindow: 120,
//         totalAmount: 7500,
//         outstandingBalance: 7500,
//         // employeeId: 1,
//     },
//     {
//         invoiceNumber: '3882',
//         description: 'Online Booking - Diagnistic',
//         customerId: 2,
//         note: null,
//         workStatus: JobStatuses.scheduled,
//         onMyWayAt: null,
//         startedAt: null,
//         completedAt: null,
//         scheduledStart: 1651309200, // 30.04. 12:00
//         scheduledEnd: 1651316400,  // 30.04. 14:00
//         arrivalWindow: 120,
//         totalAmount: 7500,
//         outstandingBalance: 7500,
//         employeeId: 2,
//     },
//     {
//         invoiceNumber: '3882',
//         description: 'Online Booking - Diagnistic',
//         note: null,
//         workStatus: JobStatuses.scheduled,
//         onMyWayAt: null,
//         startedAt: null,
//         completedAt: null,
//         scheduledStart: 1651381200, // 1.05 8:00
//         scheduledEnd: 1651388400, // 1.05 10:00
//         arrivalWindow: 120,
//         totalAmount: 7500,
//         outstandingBalance: 7500,
//         // employeeId: 1,
//     },
//     {
//         invoiceNumber: '3882',
//         description: 'Online Booking - Diagnistic',
//         note: null,
//         workStatus: JobStatuses.scheduled,
//         onMyWayAt: null,
//         startedAt: null,
//         completedAt: null,
//         scheduledStart: 1651388400, // 1.05 10:00
//         scheduledEnd: 1651395600, // 1.05 12:00
//         arrivalWindow: 120,
//         totalAmount: 7500,
//         outstandingBalance: 7500,
//         // employeeId: 1,
//     },
//     {
//         invoiceNumber: '3882',
//         description: 'Online Booking - Diagnistic',
//         customerId: 2,
//         note: null,
//         workStatus: JobStatuses.scheduled,
//         onMyWayAt: null,
//         startedAt: null,
//         completedAt: null,
//         scheduledStart: 1651395600, // 1.05 12:00
//         scheduledEnd: 1651402800,  // 1.05 14:00
//         arrivalWindow: 120,
//         totalAmount: 7500,
//         outstandingBalance: 7500,
//         employeeId: 2,
//     },
// ]
