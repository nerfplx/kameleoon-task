const loadHtml2Canvas = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        if ((window as any).html2canvas) {
            resolve((window as any).html2canvas);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        script.onload = () => resolve((window as any).html2canvas);
        script.onerror = reject;
        document.head.appendChild(script);
    });
};

export const exportChartToPNG = async (isDarkTheme: boolean) => {
    const html2canvas = await loadHtml2Canvas();

    const chartElement = document.querySelector('.chart-container');
    if (!chartElement) {
        throw new Error('График не найден');
    }

    const canvas = await html2canvas(chartElement as HTMLElement, {
        backgroundColor: isDarkTheme ? '#111827' : '#F9FAFB',
        scale: 2,
        logging: false,
    });

    return new Promise<void>((resolve) => {
        canvas.toBlob((blob: Blob | null) => {
            if (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `ab-testing-chart-${new Date().toISOString().split('T')[0]}.png`;
                link.href = url;
                link.click();
                URL.revokeObjectURL(url);
            }
            resolve();
        });
    });
};
