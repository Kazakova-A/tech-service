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
            parentId: 1,
            parentType: 'customers adres',
        },
        {
            street: '35th street',
            houseNumber: 41,
            city: 'Los Altos',
            state: 'CA',
            parentId: 2,
            parentType: 'customers adres',
        },
        {
            street: 'Monky Rd',
            houseNumber: 12,
            city: 'Los Altos',
            state: 'CA',
            parentId: 3,
            parentType: 'customers adres',
        },
        {
            street: 'Siply Rd',
            houseNumber: 67,
            city: 'Los Altos',
            state: 'CA',
            parentId: 4,
            parentType: 'customers adres',
        },
    ]

const spentTime = () => Math.floor(Math.random() * 40) + 40;

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
