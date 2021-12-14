const windmill = require('@windmill/react-ui/config')

module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [windmill],
};
