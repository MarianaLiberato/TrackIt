import React from 'react';
import { View } from 'react-native';
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryScatter,
} from 'victory-native';

const generateLast30Days = () => {
  const currentDate = new Date();
  const dates = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);
    dates.push(date);
  }
  return dates;
};

const generateRandomWeightData = () => {
  const data = [];
  const numDaysWithData = Math.floor(Math.random() * 30); // Generate a random number of days with data
  for (let i = 0; i < numDaysWithData; i++) {
    const weight = Math.floor(Math.random() * 100 + 50); // Generate random weight between 50 and 150
    data.push({ date: i, weight });
  }
  return data;
};

const fillMissingData = (dates, data) => {
  const filledData = [];
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    const matchingData = data.find(item => item.date === i);
    if (matchingData) {
      filledData.push(matchingData);
    } else {
      filledData.push({ date: i, weight: null });
    }
  }
  return filledData;
};

const WeightChart = () => {
  const dates = generateLast30Days();
  const rawData = generateRandomWeightData();
  const data = fillMissingData(dates, rawData);

  return (
    <View>
      <VictoryChart>
        <VictoryAxis
          tickCount={30}
          tickFormat={(x) => dates[x]?.getUTCDate()}
          style={{
            tickLabels: { fontSize: 8, angle: 45 },
          }}
        />
        <VictoryAxis dependentAxis />
        <VictoryLine
          data={data}
          x="date"
          y="weight"
          style={{
            data: { stroke: 'blue' },
          }}
        />
        {data.map((datum, index) => (
          datum.weight === null ? (
            <VictoryScatter
              key={index}
              data={[datum]}
              x="date"
              y="weight"
              size={5}
              style={{
                data: { fill: 'orange' },
              }}
            />
          ) : null
        ))}
        <VictoryScatter
          data={data.filter((datum) => datum.weight !== null)}
          x="date"
          y="weight"
          size={5}
          style={{
            data: { fill: 'blue' },
          }}
        />
      </VictoryChart>
    </View>
  );
};

export default WeightChart;
