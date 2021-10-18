export interface ITheme {
  colors: {
    primary: string;
    dark: {
      text: string;
      border: string;
    };
    light: {
      text: string;
      border: string;
    };
  };
  padding: {
    /** X = 4 */
    X: number;
    /** M = 8 */
    M: number;
    /** L = 16 */
    L: number;
  };
  fonts: {
    size: {
      /** X = 12 */
      X: number;
      /** M = 14 */
      M: number;
      /** L = 20 */
      L: number;
    };
  };
}

export const Theme: ITheme = {
  colors: {
    primary: '#46106b',
    dark: {
      text: 'black',
      border: '#a7a7a7'
    },
    light: {
      text: '#dedede',
      border: '#dedede'
    },
  },
  padding: {
    X: 4,
    M: 8,
    L: 16,
  },
  fonts: {
    size: {
      X: 12,
      M: 14,
      L: 20,
    },
  },
};
