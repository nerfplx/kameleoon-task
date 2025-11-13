const LineStyleSelector = ({ lineStyle, onChange, textColor, borderColor, cardBg }: any) => (
    <div>
        <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 600,
            color: textColor,
            marginBottom: '8px',
        }}>
            Стиль линии
        </label>
        <select
            value={lineStyle}
            onChange={(e) => onChange(e.target.value)}
            style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                border: `1px solid ${borderColor}`,
                backgroundColor: cardBg,
                color: textColor,
                fontSize: '14px',
                cursor: 'pointer',
            }}
        >
            <option value="Line">Line</option>
            <option value="Smooth">Smooth</option>
            <option value="Area">Area</option>
        </select>
    </div>
);

export default LineStyleSelector;
