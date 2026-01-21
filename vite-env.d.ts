// Fixed: "Cannot find type definition file for 'vite/client'". 
// Manually declared modules to satisfy TypeScript without relying on the missing/unresolvable vite/client types.

declare module '*.css';
declare module '*.png';
declare module '*.svg';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.webp';
