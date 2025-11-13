import { Sun, Moon } from 'lucide-react';

const Header = ({ isDarkTheme, onToggleTheme, textColor, cardBg }: any) => (
    <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
    }}>
        <h1 style={{
            fontSize: '28px',
            fontWeight: 700,
            color: textColor,
            margin: 0,
        }}>
            A/B Testing Analytics
        </h1>
        <button
            onClick={onToggleTheme}
            style={{
                padding: '8px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: cardBg,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {isDarkTheme ? <Sun size={20} color={textColor} /> : <Moon size={20} color={textColor} />}
        </button>
    </div>
);

export default Header;
