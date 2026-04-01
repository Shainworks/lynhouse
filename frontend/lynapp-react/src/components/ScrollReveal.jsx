/**
 * ScrollReveal — Wrapper component for scroll-triggered pop-up animations
 *
 * Usage:
 *   <ScrollReveal variant="fade-up" delay={0.1}>
 *     <YourContent />
 *   </ScrollReveal>
 *
 * Variants:
 *   fade-up | fade-down | fade-left | fade-right
 *   scale   | scale-up
 *   flip-x  | flip-y
 *   zoom-in
 *
 * Props:
 *   variant   – animation type (default: 'fade-up')
 *   delay     – seconds before animation starts (default: 0)
 *   duration  – animation duration in seconds (default: 0.65)
 *   threshold – IntersectionObserver threshold 0–1 (default: 0.12)
 *   rootMargin– IntersectionObserver margin (default: '-40px')
 *   className – extra CSS classes to add to wrapper
 *   tag       – HTML tag to render (default: 'div')
 */

import useScrollReveal from '../hooks/useScrollReveal';

const ScrollReveal = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.65,
  threshold = 0.12,
  rootMargin = '-40px',
  className = '',
  tag: Tag = 'div',
  style = {},
  ...props
}) => {
  const ref = useScrollReveal({ threshold, rootMargin });

  const animStyle = {
    '--sr-delay':    `${delay}s`,
    '--sr-duration': `${duration}s`,
    ...style,
  };

  return (
    <Tag
      ref={ref}
      className={`sr-element sr-${variant} ${className}`}
      style={animStyle}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default ScrollReveal;
