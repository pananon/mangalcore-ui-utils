import { useEffect, useLayoutEffect } from 'react';

/**
 * useLayoutEffect in the browser, useEffect during server rendering
 * (avoids React's SSR warning for layout effects).
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
