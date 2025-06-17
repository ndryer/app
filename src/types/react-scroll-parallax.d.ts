declare module 'react-scroll-parallax' {
  import * as React from 'react';

  export interface ParallaxProviderProps {
    children: React.ReactNode;
    scrollAxis?: 'vertical' | 'horizontal';
    scrollContainer?: HTMLElement;
  }

  export interface ParallaxBannerProps {
    layers: Array<{
      amount?: number;
      children?: React.ReactNode;
      expanded?: boolean;
      props?: Record<string, unknown>;
      speed?: number;
      image?: string;
      translateX?: number[] | number;
      translateY?: number[] | number;
      rotate?: number[] | number;
      scale?: number[] | number;
      opacity?: number[] | number;
      easing?: string;
      shouldAlwaysCompleteAnimation?: boolean;
      shouldDisableScalingTranslations?: boolean;
    }>;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    children?: React.ReactNode;
    id?: string;
  }

  export const ParallaxProvider: React.FC<ParallaxProviderProps>;
  export const ParallaxBanner: React.FC<ParallaxBannerProps>;
}
