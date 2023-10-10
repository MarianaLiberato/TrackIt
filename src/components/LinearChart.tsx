import React, {ReactElement} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
} from 'victory-native';
import {ChartTheme, theme} from '../constants/Theme';
import {differenceInDays, differenceInMonths, format} from 'date-fns';
import { Gradient } from './Gradient';

export interface ChartData {
  x: number;
  y: number;
}

interface LinearChartProps extends ReactElement {
  chartData: ChartData[];
  yLabel?: string;
}

const LinearChart: React.FC<LinearChartProps> = ({chartData, yLabel}) => {
  const renderLoading = () => <Text>Loading</Text>;
  const sortedData = chartData.sort((a, b) => b.x - a.x);
  const intervalDiff = differenceInMonths(
    sortedData[0].x,
    sortedData[sortedData.length - 1].x,
  );

  const formatDate = (date: number) => {
    try {
      const formattedDate = format(
        date,
        intervalDiff < 1 ? 'dd/MM' : intervalDiff < 12 ? 'MMM' : 'MMM yy',
      );
      return formattedDate;
    } catch (e) {
      console.log(e.message);
    }
    return '';
  };

  const min = Math.min(...chartData?.map(d => d.y));
  const max = Math.max(...chartData?.map(d => d.y));

  return (
    <View style={styles.container}>
      {!chartData?.length ? (
        renderLoading()
      ) : (
        <VictoryChart
          theme={ChartTheme()}
          width={Dimensions.get('window').width - theme.padding.S}
          scale={{x: 'time', y: 'linear'}}
          domainPadding={theme.padding.XS}
          minDomain={{y: min - (max - min)/4}}
          maxDomain={{y: max + (max - min)/4}}>
          <Gradient />
          <VictoryAxis dependentAxis label={yLabel} />
          {/* <VictoryLine
            interpolation="monotoneX"
            data={chartData || []}
            x={d => formatDate(d.x)}
            sortKey={d => d.x}
            style={{
              data: { stroke: theme.COLORS.ACTIVE },
              parent: { border: '1px solid #ffffff' },
            }}
          /> */}
          <VictoryArea
            interpolation="monotoneX"
            x={d => d.x}
            data={chartData || []}
            style={{data: {fill: 'url(#gradientStroke)'}}}
          />
          <VictoryAxis
            fixLabelOverlap
            tickFormat={d => formatDate(d)}
            tickCount={
              intervalDiff > 0
                ? intervalDiff > 12
                  ? Math.round((intervalDiff + 1) / 1)
                  : intervalDiff + 1
                : null
            }
          />
          <VictoryScatter
            x={d => d.x}
            data={chartData || []}
            // labels={({datum}) => datum.y}
          />
        </VictoryChart>
      )}
    </View>
  );
};

export default LinearChart;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f5fcff',
  },
});
