import * as moment from 'moment';

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
const firstJobStart = moment(now).startOf('day').add(8, 'hours')
const firstJobEnd = moment(now).startOf('day').add(10, 'hours')  // today

export const JOBS_MOCK_DATA: any[] = [
    {
        invoiceNumber: '3882',
        description: 'Online Booking - Diagnistic',
        note: null,
        workStatus: JobStatuses.scheduled,
        onMyWayAt: null,
        startedAt: null,
        completedAt: null,
        scheduledStart: (moment(now).startOf('day').add(8, 'hours').valueOf() / 1000), // 30.04. 8:00
        scheduledEnd: (moment(now).startOf('day').add(10, 'hours').valueOf() / 1000), // 30.04. 10:00
        arrivalWindow: 120,
        totalAmount: 7500,
        outstandingBalance: 7500,
        // employeeId: 1,
    },
    {
        invoiceNumber: '3882',
        description: 'Online Booking - Diagnistic',
        note: null,
        workStatus: JobStatuses.scheduled,
        onMyWayAt: null,
        startedAt: null,
        completedAt: null,
        scheduledStart: (moment(now).startOf('day').add(10, 'hours').valueOf() / 1000), // 30.04. 10:00
        scheduledEnd: (moment(now).startOf('day').add(12, 'hours').valueOf() / 1000), // 30.04. 12:00
        arrivalWindow: 120,
        totalAmount: 7500,
        outstandingBalance: 7500,
        // employeeId: 1,
    },
    {
        invoiceNumber: '3882',
        description: 'Online Booking - Diagnistic',
        customerId: 2,
        note: null,
        workStatus: JobStatuses.scheduled,
        onMyWayAt: null,
        startedAt: null,
        completedAt: null,
        scheduledStart: (moment(now).startOf('day').add(12, 'hours').valueOf() / 1000), // 30.04. 12:00
        scheduledEnd: (moment(now).startOf('day').add(14, 'hours').valueOf() / 1000),  // 30.04. 14:00
        arrivalWindow: 120,
        totalAmount: 7500,
        outstandingBalance: 7500,
        employeeId: 2,
    },
    {
        invoiceNumber: '3882',
        description: 'Online Booking - Diagnistic',
        note: null,
        workStatus: JobStatuses.scheduled,
        onMyWayAt: null,
        startedAt: null,
        completedAt: null,
        scheduledStart: (moment(now).startOf('day').add(1, 'day').add(8, 'hours').valueOf() / 1000), // 1.05 8:00
        scheduledEnd: (moment(now).startOf('day').add(1, 'day').add(10, 'hours').valueOf() / 1000), // 1.05 10:00
        arrivalWindow: 120,
        totalAmount: 7500,
        outstandingBalance: 7500,
        // employeeId: 1,
    },
    {
        invoiceNumber: '3882',
        description: 'Online Booking - Diagnistic',
        note: null,
        workStatus: JobStatuses.scheduled,
        onMyWayAt: null,
        startedAt: null,
        completedAt: null,
        scheduledStart: (moment(now).startOf('day').add(1, 'day').add(10, 'hours').valueOf() / 1000), // 1.05 10:00
        scheduledEnd: (moment(now).startOf('day').add(1, 'day').add(12, 'hours').valueOf() / 1000), // 1.05 12:00
        arrivalWindow: 120,
        totalAmount: 7500,
        outstandingBalance: 7500,
        // employeeId: 1,
    },
    {
        invoiceNumber: '3882',
        description: 'Online Booking - Diagnistic',
        customerId: 2,
        note: null,
        workStatus: JobStatuses.scheduled,
        onMyWayAt: null,
        startedAt: null,
        completedAt: null,
        scheduledStart: (moment(now).startOf('day').add(1, 'day').add(12, 'hours').valueOf() / 1000), // 1.05 12:00
        scheduledEnd: (moment(now).startOf('day').add(1, 'day').add(14, 'hours').valueOf() / 1000),  // 1.05 14:00
        arrivalWindow: 120,
        totalAmount: 7500,
        outstandingBalance: 7500,
        employeeId: 2,
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
