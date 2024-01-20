document.addEventListener('DOMContentLoaded', function () {
    const weatherData = [
        { date: '1/1/2024', temperature: 20.5 },
        { date: '1/2/2024', temperature: 22.0 },
        { date: '1/3/2024', temperature: 23.0 },
        { date: '1/4/2024', temperature: 24.0 },
        { date: '1/5/2024', temperature: 25.0 },
        { date: '1/6/2024', temperature: 23.0 },
        { date: '1/7/2024', temperature: 23.0 },
        { date: '1/8/2024', temperature: 23.0 },
        { date: '1/9/2024', temperature: 23.0 },
        { date: '1/10/2024', temperature: 23.0 }
    ];

    const analysisResult = analyzeWeatherData(weatherData);
    plotTemperatureOverTime(weatherData);
    plotTemperatureAnalysis(analysisResult);
});

function analyzeWeatherData(data) {
    if (!data || data.length === 0) {
        return null;
    }

    const temperatures = data.map(entry => entry.temperature);

    const averageTemperature = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
    const highestTemperature = Math.max(...temperatures);
    const lowestTemperature = Math.min(...temperatures);

    return {
        averageTemperature: averageTemperature.toFixed(2),
        highestTemperature: highestTemperature.toFixed(2),
        lowestTemperature: lowestTemperature.toFixed(2)
    };
}

function plotTemperatureOverTime(data) {
    const dates = data.map(entry => entry.date);
    const temperatures = data.map(entry => entry.temperature);

    const ctx = document.getElementById('temperature-over-time').getContext('2d');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Temperature Over Time',
                borderColor: 'blue',
                data: temperatures,
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'category',
                    labels: dates,
                },
                y: {
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    }
                }
            }
        }
    });
}

function plotTemperatureAnalysis(analysisResult) {
    const temperatureTypes = ['Average', 'Highest', 'Lowest'];
    const temperatures = [
        analysisResult.averageTemperature,
        analysisResult.highestTemperature,
        analysisResult.lowestTemperature
    ];

    const analysisContainer = document.getElementById('temperature-analysis');

    temperatureTypes.forEach((type, index) => {
        const paragraph = document.createElement('p');
        paragraph.textContent = `${type} Temperature: ${temperatures[index]} °C`;
        analysisContainer.appendChild(paragraph);
    });

    // Adding a bar chart for temperature analysis
    const barChartCanvas = document.createElement('canvas');
    barChartCanvas.id = 'temperature-analysis-bar-chart';
    analysisContainer.appendChild(barChartCanvas);

    const barChartCtx = barChartCanvas.getContext('2d');

    new Chart(barChartCtx, {
        type: 'bar',
        data: {
            labels: temperatureTypes,
            datasets: [{
                label: 'Temperature Analysis',
                data: temperatures,
                backgroundColor: ['blue', 'green', 'red'],
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    }
                }
            }
        }
    });
}