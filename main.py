import matplotlib.pyplot as plt

def read_weather_data(file_path):
    data = []
    with open(file_path, 'r') as file:
        next(file)  # Skip the header row
        for line in file:
            date, temperature = line.strip().split(',')
            data.append((date, float(temperature)))
    return data

def analyze_weather_data(data):
    if not data:
        return None

    dates, temperatures = zip(*data)

    average_temperature = sum(temperatures) / len(temperatures)
    highest_temperature = max(temperatures)
    lowest_temperature = min(temperatures)

    return {
        'dates': dates,
        'temperatures': temperatures,
        'average_temperature': round(average_temperature, 2),
        'highest_temperature': highest_temperature,
        'lowest_temperature': lowest_temperature
    }

def plot_weather_data(data):
    dates = data['dates']
    temperatures = data['temperatures']

    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(16, 6))

    # Line plot
    ax1.plot(dates, temperatures, marker='o', linestyle='-', color='b')
    ax1.set_title('Temperature Over Time')
    ax1.set_xlabel('Date')
    ax1.set_ylabel('Temperature (°C)')
    ax1.set_xticks(dates[::2])  # Display every second date for better visibility
    ax1.tick_params(axis='x', rotation=45)
    ax1.grid(True)

    # Bar plot
    temperatures_summary = [data['average_temperature'], data['highest_temperature'], data['lowest_temperature']]
    labels = ['Average', 'Highest', 'Lowest']
    colors = ['blue', 'green', 'red']
    ax2.bar(labels, temperatures_summary, color=colors)
    ax2.set_title('Temperature Analysis')
    ax2.set_xlabel('Temperature Type')
    ax2.set_ylabel('Temperature (°C)')

    for i, temperature in enumerate(temperatures_summary):
        ax2.text(i, temperature + 0.1, f'{temperature} °C', ha='center')

    plt.tight_layout()
    plt.show()

def main():
    file_path = 'weather_data.csv'  # Change this to the path of your CSV file
    weather_data = read_weather_data(file_path)

    if weather_data:
        analysis_result = analyze_weather_data(weather_data)

        print("Weather Data Analysis:")
        print(f"Average Temperature: {analysis_result['average_temperature']} °C")
        print(f"Highest Temperature: {analysis_result['highest_temperature']} °C")
        print(f"Lowest Temperature: {analysis_result['lowest_temperature']} °C")

        plot_weather_data(analysis_result)
    else:
        print("No weather data found in the file.")

if __name__ == "__main__":
    main()