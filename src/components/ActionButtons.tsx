import { Download } from 'lucide-react';

const ActionButtons = ({ zoomLevel, onZoom, onExport, textColor, borderColor, cardBg, isExporting }: any) => (
    <div>
        <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 600,
            color: textColor,
            marginBottom: '8px',
        }}>
            Действия
        </label>
        <div style={{ display: 'flex', gap: '8px' }}>
            <button
                onClick={onZoom}
                style={{
                    flex: 1,
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: cardBg,
                    color: textColor,
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500,
                }}
            >
                {zoomLevel === 1 ? 'Zoom' : 'Reset'}
            </button>
            <button
                onClick={onExport}
                disabled={isExporting}
                style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: `1px solid ${borderColor}`,
                    backgroundColor: cardBg,
                    color: textColor,
                    cursor: isExporting ? 'wait' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    opacity: isExporting ? 0.6 : 1,
                }}
            >
                {isExporting ? '...' : <Download size={16} />}
            </button>
        </div>
    </div>
);

export default ActionButtons;
