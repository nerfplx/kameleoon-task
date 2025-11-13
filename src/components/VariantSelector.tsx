import {colors} from "../constants";

const VariantSelector = ({ variants, selectedVariants, onToggle, textColor }: any) => (
    <div>
        <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 600,
            color: textColor,
            marginBottom: '8px',
        }}>
            Варианты
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {variants.map((variant: string, index: number) => (
                <label key={variant} style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}>
                    <input
                        type="checkbox"
                        checked={selectedVariants.has(variant)}
                        onChange={() => onToggle(variant)}
                        style={{
                            marginRight: '8px',
                            width: '16px',
                            height: '16px',
                            cursor: 'pointer',
                        }}
                    />
                    <span style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: colors[index],
                        marginRight: '8px',
                    }}></span>
                    <span style={{ color: textColor, fontSize: '14px' }}>{variant}</span>
                </label>
            ))}
        </div>
    </div>
);

export default VariantSelector;
