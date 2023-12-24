export default {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
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