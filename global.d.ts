export {};

declare global {
  interface Window {
    dataLayer?: (...args: unknown[]) => void;
  }
}
