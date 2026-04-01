/**
 * useScrollReveal — Intersection Observer Hook
 *
 * Watches a ref'd element and toggles the `.sr-visible` class
 * when it enters the viewport. Once visible, stays visible.
 *
 * @param {Object} options
 * @param {number}  options.threshold – 0–1, how much of element must be visible  (default 0.12)
 * @param {string}  options.rootMargin – margin around viewport                   (default '-40px')
 * @param {boolean} options.once      – trigger only once (default true)
 */

import { useEffect, useRef } from 'react';

const useScrollReveal = ({
  threshold = 0.12,
  rootMargin = '-40px',
  once = true,
} = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip if user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.classList.add('sr-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('sr-visible');
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.classList.remove('sr-visible');
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
};

export default useScrollReveal;
