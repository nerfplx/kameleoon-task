export interface DayData {
    date: string;
    visits: { [key: string]: number | undefined };
    conversions: { [key: string]: number | undefined };
}

export interface iData {
    variations: Array<{ id?: number; name: string }>;
    data: DayData[];
}

export type TimeRange = 'day' | 'week';
export type LineStyle = 'Line' | 'Smooth' | 'Area';
