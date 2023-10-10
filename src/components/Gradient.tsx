import React from 'react';
import { theme } from '../constants/Theme';
import { Defs, LinearGradient, Stop } from 'react-native-svg';

export const Gradient = () => (
  <Defs>
    <LinearGradient id="gradientStroke" x1="1" y1="0" x2="1" y2="1">
      <Stop offset="30%" stopColor={theme.COLORS.ACTIVE} />
      <Stop
        offset="75%"
        stopColor={theme.COLORS.BORDER_COLOR}
        stopOpacity={0.2} />
      <Stop
        offset="100%"
        stopColor={theme.COLORS.BORDER_COLOR}
        stopOpacity={0.1} />
    </LinearGradient>
  </Defs>
);
