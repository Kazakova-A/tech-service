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

export const ADDRESESSDATA: any[] = [
        {
            street: 'Clinton Rd',
            houseNumber: 23,
            city: 'Los Altos',
            state: 'CA',
            adressId: 1,
            adressType: 'customers adres',
        },
        {
            street: '35th street',
            houseNumber: 41,
            city: 'Los Altos',
            state: 'CA',
            adressId: 2,
            adressType: 'customers adres',
        },
        {
            street: 'Monky Rd',
            houseNumber: 12,
            city: 'Los Altos',
            state: 'CA',
            adressId: 3,
            adressType: 'customers adres',
        },
        {
            street: 'Siply Rd',
            houseNumber: 67,
            city: 'Los Altos',
            state: 'CA',
            adressId: 4,
            adressType: 'customers adres',
        },
    ]

export const JOBS_MOCK_DATA: any[] = [
    {
        invoiceNumber: '3882',
        description: 'Online Booking - Diagnistic',
        note: null,
        workStatus: JobStatuses.scheduled,
        onMyWayAt: null,
        startedAt: null,
        completedAt: null,
        scheduledStart: (moment.utc(now).startOf('day').add(5, 'hours').valueOf() / 1000), // today 5:00 in utc
        scheduledEnd: (moment.utc(now).startOf('day').add(7, 'hours').valueOf() / 1000), // today 7:00 in utc
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
        scheduledStart: (moment.utc(now).startOf('day').add(7, 'hours').valueOf() / 1000),
        scheduledEnd: (moment.utc(now).startOf('day').add(9, 'hours').valueOf() / 1000),
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
        scheduledStart: (moment.utc(now).startOf('day').add(7, 'hours').valueOf() / 1000),
        scheduledEnd: (moment.utc(now).startOf('day').add(9, 'hours').valueOf() / 1000),
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
        scheduledStart: (moment.utc(now).startOf('day').add(1, 'day').add(5, 'hours').valueOf() / 1000),
        scheduledEnd: (moment.utc(now).startOf('day').add(1, 'day').add(7, 'hours').valueOf() / 1000),
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
        scheduledStart: (moment.utc(now).startOf('day').add(1, 'day').add(7, 'hours').valueOf() / 1000),
        scheduledEnd: (moment.utc(now).startOf('day').add(1, 'day').add(9, 'hours').valueOf() / 1000),
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
        scheduledStart: (moment.utc(now).startOf('day').add(1, 'day').add(9, 'hours').valueOf() / 1000),
        scheduledEnd: (moment.utc(now).startOf('day').add(1, 'day').add(11, 'hours').valueOf() / 1000),
        arrivalWindow: 120,
        totalAmount: 7500,
        outstandingBalance: 7500,
        employeeId: 2,
    },
]
