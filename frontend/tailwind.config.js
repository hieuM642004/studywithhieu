/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/html/utils/withMT";
/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./src/app/**/*.{html,ts}",
    "./src/app/components/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
});

