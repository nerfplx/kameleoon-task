import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Header from './components/Header';
import VariantSelector from "./components/VariantSelector.tsx";
import CustomTooltip  from "./components/CustomTooltip.tsx";
import TimeRangeSelector from "./components/TimeRangeSelector.tsx";
import LineStyleSelector from "./components/LineStyleSelector.tsx";
import ActionButtons from "./components/ActionButtons.tsx";
import StatsCard from "./components/StatsCard.tsx";
import processData from "./utils/processData.ts";
import aggregateByWeek from "./utils/aggregateByWeek.ts";
import type {LineStyle, TimeRange} from "./types";
import {colors, variantMap} from "./constants";
import data from "./data/data.json"
import {exportChartToPNG} from "./utils/exportChart.ts";

const App: React.FC = () => {
    const [selectedVariants, setSelectedVariants] = useState<Set<string>>(
        new Set(['Original', 'Variation B'])
    );
    const [timeRange, setTimeRange] = useState<TimeRange>('day');
    const [lineStyle, setLineStyle] = useState<LineStyle>('Line');
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isExporting, setIsExporting] = useState(false);

    const variants = Object.values(variantMap);
    const processedData = useMemo(() => processData(data), []);

    const chartData = useMemo(() => {
        const allDates = new Set<string>();
        const variantData: { [key: string]: Array<{ date: string; visits: number; conversions: number }> } = {};

        selectedVariants.forEach(variant => {
            const data = timeRange === 'week'
                ? aggregateByWeek(processedData[variant])
                : processedData[variant];

            variantData[variant] = data;
            data.forEach(point => allDates.add(point.date));
        });

        const sortedDates = Array.from(allDates).sort();

        return sortedDates.map(date => {
            const point: any = { date };

            selectedVariants.forEach(variant => {
                const variantPoint = variantData[variant].find(p => p.date === date);
                if (variantPoint && variantPoint.visits > 0) {
                    point[variant] = (variantPoint.conversions / variantPoint.visits) * 100;
                }
            });

            return point;
        });
    }, [selectedVariants, timeRange, processedData]);

    const yAxisDomain = useMemo(() => {
        let min = Infinity;
        let max = -Infinity;

        chartData.forEach(point => {
            selectedVariants.forEach(variant => {
                if (point[variant] !== undefined) {
                    min = Math.min(min, point[variant]);
                    max = Math.max(max, point[variant]);
                }
            });
        });

        const padding = (max - min) * 0.1;
        return [Math.max(0, min - padding), max + padding];
    }, [chartData, selectedVariants]);

    const toggleVariant = (variant: string) => {
        const newSelected = new Set(selectedVariants);
        if (newSelected.has(variant)) {
            if (newSelected.size > 1) {
                newSelected.delete(variant);
            }
        } else {
            newSelected.add(variant);
        }
        setSelectedVariants(newSelected);
    };

    const handleExport = async () => {
        setIsExporting(true);
        try {
            await exportChartToPNG(isDarkTheme);
        } catch (error) {
            alert(`Не удалось экспортировать график`);
        } finally {
            setIsExporting(false);
        }
    };

    const handleZoom = () => {
        setZoomLevel(prev => (prev === 1 ? 1.5 : 1));
    };

    const bgColor = isDarkTheme ? '#111827' : '#F9FAFB';
    const cardBg = isDarkTheme ? '#1F2937' : '#FFFFFF';
    const textColor = isDarkTheme ? '#F3F4F6' : '#111827';
    const borderColor = isDarkTheme ? '#374151' : '#E5E7EB';

    const ChartComponent = lineStyle === 'Area' ? AreaChart : LineChart;

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: bgColor,
            padding: '24px',
            transition: 'background-color 0.3s',
        }}>
            <div style={{
                maxWidth: '1300px',
                margin: '0 auto',
            }}>
                <Header
                    isDarkTheme={isDarkTheme}
                    onToggleTheme={() => setIsDarkTheme(!isDarkTheme)}
                    textColor={textColor}
                    cardBg={cardBg}
                />

                <div style={{
                    backgroundColor: cardBg,
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '24px',
                    border: `1px solid ${borderColor}`,
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                    }}>
                        <VariantSelector
                            variants={variants}
                            selectedVariants={selectedVariants}
                            onToggle={toggleVariant}
                            textColor={textColor}
                        />
                        <TimeRangeSelector
                            timeRange={timeRange}
                            onChange={setTimeRange}
                            textColor={textColor}
                            borderColor={borderColor}
                        />
                        <LineStyleSelector
                            lineStyle={lineStyle}
                            onChange={setLineStyle}
                            textColor={textColor}
                            borderColor={borderColor}
                            cardBg={cardBg}
                        />
                        <ActionButtons
                            zoomLevel={zoomLevel}
                            onZoom={handleZoom}
                            onExport={handleExport}
                            textColor={textColor}
                            borderColor={borderColor}
                            cardBg={cardBg}
                            isExporting={isExporting}
                        />
                    </div>
                </div>

                <div
                    className="chart-container"
                    style={{
                    backgroundColor: cardBg,
                    borderRadius: '12px',
                    padding: '24px',
                    border: `1px solid ${borderColor}`,
                    height: `${400 * zoomLevel}px`,
                }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <ChartComponent data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={borderColor} />
                            <XAxis
                                dataKey="date"
                                stroke={textColor}
                                style={{ fontSize: '12px' }}
                                tickFormatter={(value) => {
                                    const date = new Date(value);
                                    return date.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' });
                                }}
                            />
                            <YAxis
                                stroke={textColor}
                                style={{ fontSize: '12px' }}
                                domain={yAxisDomain}
                                tickFormatter={(value) => `${value.toFixed(1)}%`}
                            />
                            <Tooltip content={<CustomTooltip isDarkTheme={isDarkTheme} />} />
                            {Array.from(selectedVariants).map((variant) => {
                                if (lineStyle === 'Area') {
                                    return (
                                        <Area
                                            key={variant}
                                            type="monotone"
                                            dataKey={variant}
                                            stroke={colors[variants.indexOf(variant)]}
                                            fill={colors[variants.indexOf(variant)]}
                                            fillOpacity={0.3}
                                            strokeWidth={2}
                                        />
                                    );
                                } else {
                                    return (
                                        <Line
                                            key={variant}
                                            type={lineStyle === 'Smooth' ? 'monotone' : 'linear'}
                                            dataKey={variant}
                                            stroke={colors[variants.indexOf(variant)]}
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                            activeDot={{ r: 6 }}
                                        />
                                    );
                                }
                            })}
                        </ChartComponent>
                    </ResponsiveContainer>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                    marginTop: '24px',
                }}>
                    {Array.from(selectedVariants).map((variant) => (
                        <StatsCard
                            key={variant}
                            variant={variant}
                            data={processedData[variant]}
                            textColor={textColor}
                            cardBg={cardBg}
                            borderColor={borderColor}
                            color={colors[variants.indexOf(variant)]}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default App;
