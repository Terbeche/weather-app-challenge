export default defineNuxtPlugin(() => {
    // This code only runs on the client side
    if (typeof window !== 'undefined') {
        // Check for dark mode preference in localStorage
        const savedTheme = localStorage.getItem('color-theme');

        // Check for system preference if no saved preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Apply appropriate class
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
});
