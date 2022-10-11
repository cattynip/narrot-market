const options = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};

/** @type {import('tailwindcss').Config} */
module.exports = options;
