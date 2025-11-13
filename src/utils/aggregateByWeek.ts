const aggregateByWeek = (data: Array<{ date: string; visits: number; conversions: number }>) => {
    const weeks: { [key: string]: { visits: number; conversions: number } } = {};

    data.forEach(point => {
        const date = new Date(point.date);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        const weekKey = weekStart.toISOString().split('T')[0];

        if (!weeks[weekKey]) {
            weeks[weekKey] = { visits: 0, conversions: 0 };
        }
        weeks[weekKey].visits += point.visits;
        weeks[weekKey].conversions += point.conversions;
    });

    return Object.entries(weeks).map(([date, data]) => ({
        date,
        visits: data.visits,
        conversions: data.conversions,
    }));
};

export default aggregateByWeek;
