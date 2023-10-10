export const theme = {
  // #6e75c4, #ff99c8, #fcf6bd, #d0f4de, #a9def9
  // #515AB8
  COLORS2: {
    MID_BLUE: '#183684',
    DARK_BLUE: '#07131f',
    DARK_PURPLE: '#31006d',
    GREEN: '#00c691',
    LIGHT_GREEN: '#85FFDE',
    DARK_GREEN: '#00664B',
    PALE_BLUE: '#7EB5DD',
    ORANGE: '#d27c65',
    BROWN: '#734231',
    BLUE: '#2d6bbd',
  },
  COLORS: {
    DEFAULT: '#2c3581',
    PRIMARY: '#1B3C6D',
    SECONDARY: '#515AB8',
    BACKGROUND: '#000505',
    LABEL: '#DADADA',
    INFO: '#11CDEF',
    ERROR: '#F5365C',
    SUCCESS: '#2DCE89',
    WARNING: '#FB6340',
    /*not yet changed */
    MUTED: '#ADB5BD',
    INPUT: '#DCDCDC',
    INPUT_SUCCESS: '#7BDEB2',
    INPUT_ERROR: '#FCB3A4',
    ACTIVE: '#5E72E4', //same as primary
    BUTTON_COLOR: '#9C26B0', //wtf
    PLACEHOLDER: '#9FA5AA',
    SWITCH_ON: '#5E72E4',
    SWITCH_OFF: '#D4D9DD',
    GRADIENT_START: '#132555',
    GRADIENT_END: '#1A1D22',
    BUTTON_GRADIENT_START: '#285987',
    BUTTON_GRADIENT_END: '#0F488A',
    PRICE_COLOR: '#EAD5FB',
    BORDER_COLOR: '#E7E7E7',
    BLOCK: '#E7E7E7',
    ICON: '#6FA0CD',
    HEADER: '#525F7F',
    BORDER: '#CAD1D7',
    WHITE: '#FFFFFF',
    BLACK: '#000000',
  },
  padding: {
    XS: 10,
    S: 15,
    M: 20,
    L: 40,
    XL: 60,
  },
  fontSize: {
    button: 16,
    title: 24
  },
};

export const ChartTheme = () => {
  // Strokes
  const strokeDasharray = '10, 5';
  const strokeLinecap = 'round';
  const strokeLinejoin = 'round';

  // Put it all together...
  const cTheme = {
    axis: {
      style: {
        axis: {
          stroke: theme.COLORS.BORDER_COLOR,
          strokeWidth: 2,
        },
        axisLabel: {
          fill: 'white',
          // stroke: "red",
          // strokeWidth: 3,
          color: 'white',
          textAnchor: "middle",
          padding: 20
        },
        grid: {
          fill: 'none',
          stroke: theme.COLORS.PRIMARY
        },
        tickLabels: {
          angle: 0,
          fill: theme.COLORS.BORDER_COLOR,
          padding: theme.padding.XS,
          fontSize: 10,
          textAnchor: 'middle'
        },
      },
    },
    area: {
      style: {
        data: {
          fill: theme.COLORS.ACTIVE
        }
      },
    },
    line: {
      style: {
        data: {
          fill: 'transparent',
          opacity: 1,
          stroke: 'red',
          strokeWidth: 2,
        },
      },
    },
    scatter: {
      style: {
        data: {
          fill: theme.COLORS.WHITE,
        },
        labels: {
          fill: 'white',
          padding: 5,
          fontSize: 10
        }
      }
    }
  };

  return cTheme
};
