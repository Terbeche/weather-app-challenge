import { ref, onMounted } from 'vue';

const glob = import.meta.glob('~/assets/icons/*.svg');

export function useWeatherIcons() {
    const icons = ref<{ [key: string]: string }>({});

    const loadIcons = async () => {
        icons.value = Object.fromEntries(
            await Promise.all(
                Object.entries(glob).map(async ([key, value]) => [
                    key.split('/').pop()?.split('.')[0] ?? '',
                    ((await value()) as { default: string }).default,
                ]),
            ),
        );
    };

    const getWeatherIcon = (code: number): string => {
        switch (true) {
            case code === 0:
                return '1';
            case code >= 1 && code <= 3:
            case code >= 80 && code <= 82:
                return '2';
            case code >= 45 && code <= 48:
            case code >= 51 && code <= 57:
            case code >= 61 && code <= 67:
                return '3';
            case code >= 71 && code <= 77:
            case code >= 85 && code <= 86:
                return '4';
            case code >= 95 && code <= 99:
                return '5';
            default:
                return '1';
        }
    };

    const getIconUrl = async (code: number): Promise<string> => {
        const iconName = getWeatherIcon(code);
        const module = (await glob[`~/assets/icons/${iconName}.svg`]()) as { default: string };
        return module.default;
    };

    onMounted(loadIcons);

    return { icons, getWeatherIcon, getIconUrl };
}
