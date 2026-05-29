import { type Heidi } from './index';

/**
 * Renders the Heidi widget iframe and attaches it to the specified DOM element.
 * 
 * @param {HTMLElement} attachTo - The parent HTML element where the Heidi widget iframe will be appended.
 * @param {string} baseUrl - The base URL of the Heidi widget application.
 * @param {Heidi} heidiInstance - The Heidi instance initiating and controlling this frame.
 * @returns {Promise<HTMLIFrameElement>} A promise that resolves to the created iframe element once loaded.
 */
export declare function render(attachTo: HTMLElement, baseUrl: string, heidiInstance: Heidi): Promise<HTMLIFrameElement>;

/**
 * Destroys the Heidi widget frame, performing all necessary DOM cleanup and resetting instance states.
 * 
 * @param {HTMLElement} root - The parent HTML element containing the Heidi widget iframe.
 * @param {HTMLIFrameElement} iframe - The iframe element to be removed.
 * @param {Heidi} heidiInstance - The Heidi instance being cleaned up.
 */
export declare function destroy(root: HTMLElement, iframe: HTMLIFrameElement, heidiInstance: Heidi): void;

