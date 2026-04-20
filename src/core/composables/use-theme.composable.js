import { ref, watch } from 'vue';

/**
 * use-theme.composable.js
 * Composable for light / dark mode switching.
 * Toggles `.dark-mode` class on the `.app-wrapper` element.
 * Shared singleton state.
 */

const isDark = ref(true);

export function useTheme() {
  function toggleTheme() {
    isDark.value = !isDark.value;
    applyTheme();
  }

  function applyTheme() {
    const wrapper = document.querySelector('.app-wrapper');
    if (!wrapper) return;
    if (isDark.value) {
      wrapper.classList.add('dark-mode');
      wrapper.classList.remove('light-mode');
    } else {
      wrapper.classList.remove('dark-mode');
      wrapper.classList.add('light-mode');
    }
  }

  return { isDark, toggleTheme, applyTheme };
}
