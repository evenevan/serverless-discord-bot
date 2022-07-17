export interface CustomID {
    customID: string,
    values?: {
        [key: string]: boolean | null | number | string
    },
}