const CustomTooltip = ({ active, payload, label, isDarkTheme }: any) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                backgroundColor: isDarkTheme ? '#1F2937' : 'white',
                border: `1px solid ${isDarkTheme ? '#374151' : '#E5E7EB'}`,
                borderRadius: '8px',
                padding: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}>
                <p style={{
                    margin: '0 0 8px 0',
                    fontWeight: 600,
                    color: isDarkTheme ? '#F3F4F6' : '#111827',
                }}>
                    {new Date(label).toLocaleDateString('ru-RU', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                </p>
                {payload.map((entry: any, index: number) => (
                    <p key={index} style={{
                        margin: '4px 0',
                        color: entry.color,
                        fontSize: '14px',
                    }}>
                        {entry.name}: <strong>{entry.value.toFixed(2)}%</strong>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default CustomTooltip
