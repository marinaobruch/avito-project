export default {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
      screens: {
        '2xl': {'max': '1535px'},
        // => @media (max-width: 1535px) { ... }
  
        'xl': {'max': '1279px'},
        // => @media (max-width: 1279px) { ... }
        'xl-min': '1279px',
        // => @media (min-width: 1279px) { ... }
  
        'lg': {'max': '920px'},
        // => @media (max-width: 920px) { ... }
        'lg-min': '920px',
        // => @media (min-width: 920px) { ... }
  
        'md': {'max': '767px'},
        // => @media (max-width: 767px) { ... }
        'md-min': '767px',
        // => @media (min-width: 767px) { ... }
  
        'sm': {'max': '640px'},
        // => @media (max-width: 639px) { ... }
        'sm-min': '640px',
        // => @media (min-width: 640px) { ... }

        'xs': {'max': '380px'},
        // => @media (max-width: 380px) { ... }
      },

      extend: {
        fontFamily: {
          roboto: ['Roboto-Regular', 'sans-serif'],
          robotoLight: ['Roboto-Light', 'sans-serif'],
          robotoMedium: ['Roboto-Medium', 'sans-serif'],
        },
        height: {
          '200': '200px',
          '450': '450px',
          '480': '480px',
          '600': '600px',
          '650': '650px',
          '800': '800px',
          '75vh': '40vh',
        },
        width: {
          '480': '480px',
          '500': '500px',
          '600': '600px',
          '614': '614px',
          '876': '876px',
          '1440': '1440px',
        },
        maxWidth: {
          '792': '792px',
          '152': '152px',
        },
        minWidth: {
          '152': '152px',
        },
        minHeight: {
          '900': '900px'
        }
      },
    },
    plugins: [],
  }