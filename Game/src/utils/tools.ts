// tools.ts

/** Helpful funtion for sleep x ms */
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
