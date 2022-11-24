export interface CustomId {
    customID: string,
    values?: {
        [key: string]: boolean | null | number | string
    },
}
