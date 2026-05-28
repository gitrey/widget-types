import { type Heidi } from './index';
export declare function render(attachTo: HTMLElement, baseUrl: string, heidiInstance: Heidi): Promise<HTMLIFrameElement>;
export declare function destroy(root: HTMLElement, iframe: HTMLIFrameElement, heidiInstance: Heidi): void;
