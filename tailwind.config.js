/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.jsx",
        "./resources/**/*.js",
        flowbite.content(),
    ],
    theme: {
        extend: {
            fontFamily: {
                lexend: ["Lexend", "sans-serif"],
            },
        },
    },
    plugins: [flowbite.plugin()],
};
