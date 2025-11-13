const StatsCard = ({ variant, data, textColor, cardBg, borderColor, color }: any) => {
    const totalConversions = data.reduce((sum: number, point: any) => sum + point.conversions, 0);
    const totalVisits = data.reduce((sum: number, point: any) => sum + point.visits, 0);
    const avgConversion = totalVisits > 0 ? (totalConversions / totalVisits) * 100 : 0;

    return (
        <div style={{
            backgroundColor: cardBg,
            borderRadius: '12px',
            padding: '20px',
            border: `1px solid ${borderColor}`,
            borderLeft: `4px solid ${color}`,
        }}>
            <div style={{
                fontSize: '14px',
                color: textColor,
                opacity: 0.7,
                marginBottom: '4px',
            }}>
                {variant}
            </div>
            <div style={{
                fontSize: '28px',
                fontWeight: 700,
                color: textColor,
            }}>
                {avgConversion.toFixed(2)}%
            </div>
            <div style={{
                fontSize: '12px',
                color: textColor,
                opacity: 0.6,
                marginTop: '4px',
            }}>
                Средняя конверсия
            </div>
        </div>
    );
};

export default StatsCard;
