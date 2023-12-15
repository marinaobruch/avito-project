export default {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          roboto: ['Roboto-Regular', 'sans-serif'],
          robotoLight: ['Roboto-Light', 'sans-serif']
        },
        height: {
          '450': '450px',
          '480': '480px',
          '650': '650px',
        },
        width: {
          '480': '480px',
          '614': '614px',
          '876': '876px',
          '1440': '1440px',
        },
        maxWidth: {
          '792': '792px',
        }
      },
    },
    plugins: [],
  }