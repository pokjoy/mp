/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // 确保包含 mdx 文件
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
	fontFamily: {
	  sans: ['"Satoshi"', 'ui-sans-serif', 'system-ui'],
	},
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

