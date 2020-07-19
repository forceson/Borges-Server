export enum ENV {
    LOCAL = 'local',
    TEST = 'dev',
    STAGE = 'stage',
    PRODUCTION = 'prod',
}

export const IS_PRODUCTION = process.env.NODE_ENV === ENV.PRODUCTION;