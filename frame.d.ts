import { type FDI } from './index';
export declare function render(attachTo: HTMLElement, baseUrl: string, fdiInstance: FDI): Promise<HTMLIFrameElement>;
export declare function destroy(root: HTMLElement, iframe: HTMLIFrameElement, fdiInstance: FDI): void;
