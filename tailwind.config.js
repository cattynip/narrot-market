const options = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
};

/** @type {import('tailwindcss').Config} */
module.exports = options;
