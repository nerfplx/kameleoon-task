const TimeRangeSelector = ({ timeRange, onChange, textColor, borderColor }: any) => (
    <div>
        <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 600,
            color: textColor,
            marginBottom: '8px',
        }}>
            Период
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
            <button
                onClick={() => onChange('day')}
                style={{
                    flex: 1,
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: timeRange === 'day' ? '#4F46E5' : borderColor,
                    color: timeRange === 'day' ? 'white' : textColor,
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500,
                }}
            >
                День
            </button>
            <button
                onClick={() => onChange('week')}
                style={{
                    flex: 1,
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: timeRange === 'week' ? '#4F46E5' : borderColor,
                    color: timeRange === 'week' ? 'white' : textColor,
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500,
                }}
            >
                Неделя
            </button>
        </div>
    </div>
);

export default TimeRangeSelector;
