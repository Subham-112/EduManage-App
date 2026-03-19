import {
    MODE,
    DEV_BASE_URL,
    PROD_BASE_URL,
} from '@env';

export const BASE_URL = MODE === 'prod' ? PROD_BASE_URL : DEV_BASE_URL;