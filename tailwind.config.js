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
  
        'lg': {'max': '1023px'},
        // => @media (max-width: 1023px) { ... }
  
        'md': {'max': '767px'},
        // => @media (max-width: 767px) { ... }
  
        'sm': {'max': '639px'},
        // => @media (max-width: 639px) { ... }

        'sm-min': '640px',
        // => @media (min-width: 640px) { ... }

        'xs': {'max': '320px'},
        // => @media (max-width: 320px) { ... }
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