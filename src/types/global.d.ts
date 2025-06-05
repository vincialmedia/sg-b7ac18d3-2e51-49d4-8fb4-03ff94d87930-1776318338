
export {};

declare global {
  interface Window {
    _hsq: any[]; // You can refine this type if you know the structure of _hsq
  }
}
