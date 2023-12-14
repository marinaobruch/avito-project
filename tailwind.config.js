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
          '450': '440px',
          '650': '640px',
        }
      },
    },
    plugins: [],
  }