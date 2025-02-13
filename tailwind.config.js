import cssMacro from 'weapp-tailwindcss/css-macro';
import { isMp } from '@uni-helper/uni-env';

module.exports = {
  important: true,
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {},
      textColor: {},
      backgroundColor: {},
      backgroundImage: {},
      backgroundSize: {
        full: '100% 100%'
      },
      borderColor: {},
      boxShadow: {},
      gridTemplateRows: {},
      gridTemplateColumns: {}
    }
  },
  plugins: [
    cssMacro({
      // negative为true，代表ifndef，否则代表ifdef
      variantsMap: {
        wx: 'MP-WEIXIN',
        '-wx': {
          value: 'MP-WEIXIN',
          negative: true
        },
        h5: {
          value: 'H5'
        },
        '-h5': {
          value: 'H5',
          negative: true
        }
      }
    })
  ],
  corePlugins: {
    preflight: !isMp
  }
};
