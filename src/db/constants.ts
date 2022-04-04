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

export const JOBS_MOCK_DATA: any[] = [
    {
        invoiceNumber: '3882',
        description: 'Online Booking - Diagnistic',
        note: null,
        workStatus: JobStatuses.scheduled,
        onMyWayAt: null,
        startedAt: null,
        completedAt: null,
        scheduledStart: '1651309200000',
        scheduledEnd: '1651320000000',
        arrivalWindow: 120,
        totalAmount: 7500,
        outstandingBalance: 7500,
        employeeId: 1,
    },
    {
        invoiceNumber: '3882',
        description: 'Online Booking - Diagnistic',
        note: null,
        workStatus: JobStatuses.scheduled,
        onMyWayAt: null,
        startedAt: null,
        completedAt: null,
        scheduledStart: '1651305600000',
        scheduledEnd: '1651320000000',
        arrivalWindow: 120,
        totalAmount: 7500,
        outstandingBalance: 7500,
        employeeId: 2,
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
        scheduledStart: '1651334400000',
        scheduledEnd: '1651341600000',
        arrivalWindow: 120,
        totalAmount: 7500,
        outstandingBalance: 7500,
        employeeId: 2,
    },
]
