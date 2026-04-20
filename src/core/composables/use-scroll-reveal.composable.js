import { onMounted, onUnmounted, watch } from 'vue';
import { useI18n } from './use-i18n.composable.js';

/**
 * Composable that observes elements with the `.reveal` class
 * and adds `.visible` when they enter the viewport.
 * Re-observes after language changes to catch new DOM elements.
 */
export function useScrollReveal() {
  let observer = null;
  const { lang } = useI18n();

  const observeAll = () => {
    if (observer) observer.disconnect();

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });
  };

  onMounted(() => {
    setTimeout(observeAll, 50);
  });

  // Re-observe when language changes (new DOM elements appear)
  watch(lang, () => {
    setTimeout(observeAll, 100);
  });

  onUnmounted(() => {
    if (observer) observer.disconnect();
  });
}