import { HeidiController } from './controller';
import { type HeidiControl, type HeidiExtensionControl, type HeidiOptions } from './types';
/**
 * @class Heidi
 * @extends HeidiController
 * @description Main class for initializing and managing the Heidi widget. Ensures singleton pattern implementation.
 */
export declare class Heidi extends HeidiController {
    /**
     * Creates an instance of the Heidi widget.
     * 
     * @constructor
     * @param {HeidiOptions} [options] - Initial configuration options to customize the Heidi widget instance.
     */
    constructor(options?: HeidiOptions);
    /**
     * @method getOptions
     * @returns {HeidiOptions} The current Heidi configuration options
     * @description Retrieves the current options set for the Heidi instance
     */
    getOptions(): HeidiOptions;
    /**
     * @method setControl
     * @param {HeidiControl} control - The control object to be set
     * @description Sets the control object for managing Heidi's behavior
     */
    setControl(control: HeidiControl): void;
    /**
     * @method getControl
     * @returns {HeidiControl} The current control object
     * @description Retrieves the current control object for managing Heidi's behavior
     */
    getControl(): HeidiControl;
    /**
     * @method destroy
     * @description Destroys the current Heidi instance and cleans up resources
     */
    destroy(): void;
    /**
     * @method ready
     * @description Signals that the Heidi application is ready
     */
    ready(): void;
    /**
     * @method setExtensionControl
     * @param {HeidiExtensionControl} control - The extension control object to be set
     * @description Sets the extension control object for Chrome extension functionality. Only works in Chrome extension environment.
     */
    setExtensionControl(control: HeidiExtensionControl): void;
}
