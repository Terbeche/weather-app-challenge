import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // dark mode colors
                'custom-cyan': '#d4e8f8',
                'custom-gray': '#323232',
                'custom-gray-dashboard': '#1b1b1d',
                'custom-gray-text': '#bebebe',
                'custom-gray-input': '#555555',

                // Light mode colors
                'light-bg': '#f5f7fa',
                'light-card': '#ffffff',
                'light-text': '#333333',
                'light-secondary': '#718096',
                'light-input': '#e2e8f0',
                'light-accent': '#3182ce',
            },
        },
    },
};
