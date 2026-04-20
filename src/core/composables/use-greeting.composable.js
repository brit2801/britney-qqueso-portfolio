import { computed } from 'vue';
import { useI18n } from './use-i18n.composable.js';

/**
 * Composable that returns a time-based greeting string.
 * Now supports EN/ES via i18n composable.
 */
export function useGreeting() {
  const { t } = useI18n();

  const greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return t.value.greeting.morning;
    if (hour >= 12 && hour < 18) return t.value.greeting.afternoon;
    return t.value.greeting.evening;
  });

  return { greeting };
}
