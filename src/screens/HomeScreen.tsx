import React, {useEffect, useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import CategoryCard from '../components/CategoryCard'; // Import the CategoryCard component
import {Category, Entry, getCategories} from '../data/data'; // Import data functions
import Screen from '../components/Screen';
import Button from '../components/Button';
import GradientBtn from '../components/GradientBtn';
import CategoryCardGroup from '../components/CategoryCardGroup';
import GradientButton from '../components/GradientButton';
import {theme} from '../constants/Theme';
import SquareCard from '../components/SquareCard';
import Chart from '../components/Chart';
import LinearChart from '../components/LinearChart';
import { mockWellBeingEntries } from '../data/mockWellBeingEntries';
import {addDays} from 'date-fns';

export function convertDataToChartFormat(data: any[]) {
  let chartData: any[] = [];
  // data = mockWellBeingEntries; // TODO DELETE ME
  chartData = data?.map(data => {
    return {y: data.level, x: data.timestamp};
  });

  return chartData;
}

const getDayInYear = (date: number) => {
  const newDate = new Date(date);
  return new Date(
    newDate?.getFullYear(),
    newDate?.getMonth(),
    newDate?.getDate(),
  );
};

const getDatesInterval = (entries: any[]) => {
  const dates = entries.map(entry => entry.date || new Date(entry.timestamp)); // TODO fixme
  const orderedDates = dates.sort(function (a, b) {
    return a.getTime() - b.getTime();
  });

  const startDate = orderedDates[0];
  const endDate = orderedDates[orderedDates.length - 1];

  return {
    startDate: getDayInYear(startDate),
    endDate: getDayInYear(endDate),
  };
};

function fillNullWithAverage(chartData: any[]) {
  let ind = -1,
    prevIndex,
    nJumps,
    valJump;

  for (var currIndex = 0; currIndex < chartData.length; currIndex++) {
    if (chartData[currIndex].x == null) {
      continue;
    } else if (
      prevIndex === undefined ||
      (nJumps = currIndex - prevIndex) === 1
    ) {
      prevIndex = currIndex;
      continue;
    }

    valJump = (chartData[currIndex].y - chartData[prevIndex].y) / nJumps;

    ind = +prevIndex;
    while (++ind < +currIndex)
      chartData[ind].y = chartData[ind - 1].y + valJump;

    prevIndex = currIndex;
  }

  return chartData;
}

const findAverage = (numbers: number[]) => {
  let sum = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  return sum / numbers.length;
};

export function convertDataToChartFormat2(data: Entry[]) {
  let chartData: any[] = [];
  // data = mockWellBeingEntries // TODO DELETE ME
  const {startDate, endDate} = getDatesInterval(data);

  let currentDate = startDate;
  while (currentDate <= new Date(endDate)) {
    try {
      const matchingData = data.filter(item => {
        return (
          item.timestamp &&
          getDayInYear(item.timestamp).valueOf() === currentDate.valueOf()
        );
      });

      if (matchingData?.length > 0) {
        const average = findAverage(
          matchingData.map(data =>
            data.isBoolean ? 1 : Number.parseFloat(data.value, 10) || 0,
          ),
        );
        chartData.push({x: matchingData[0]?.timestamp, y: average});
      } else if (matchingData?.length) {
        chartData.push({
          x: matchingData[0]?.timestamp,
          y: matchingData[0].isBoolean
            ? 1
            : Number.parseFloat(matchingData[0].value, 10) || 0,
        });
      } else {
        // console.log('no matching');
      }
      currentDate = addDays(currentDate, 1);
    } catch (e) {
      console.log(e, currentDate);
    }
  }

  chartData = fillNullWithAverage(chartData);

  return chartData;
}

const HomeScreen = ({navigation}) => {
  const [categories, setCategories] = useState<Category[]>();
  const [lastCategories, setLastCategories] = useState<Category[]>();

  useEffect(() => {
    async function fetchData() {
      const initialCategories = await getCategories();
      setCategories(initialCategories);
      setLastCategories(initialCategories.slice(initialCategories.length - 3));
    }
    fetchData();
  }, []);

  return (
    <Screen>
      <Text style={styles.title}>Categories</Text>
      <CategoryCardGroup square>
        {lastCategories?.map(category => (
          <SquareCard
            key={category.id}
            name={category.name}
            icon={category.icon}
            onPress={() =>
              navigation.navigate('Activities', {
                categoryId: category.id,
                categoryName: category.name,
              })
            }
          />
        ))}
      </CategoryCardGroup>
      <Text style={styles.title}>Categories</Text>
      <CategoryCardGroup>
        {categories?.map(category => (
          <CategoryCard
            key={category.id}
            name={category.name}
            icon={category.icon}
            onPress={() =>
              navigation.navigate('Activities', {
                categoryId: category.id,
                categoryName: category.name,
              })
            }
          />
        ))}
      </CategoryCardGroup>
      <GradientButton
        title="Manage Categories"
        onPress={() => navigation.navigate('Categories')}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    alignSelf: 'flex-start',
    color: theme.COLORS.LABEL,
  },
});

export default HomeScreen;
