import { FDIController } from './controller';
import { type FDIControl, type FDIExtensionControl, type FDIOptions } from './types';
/**
 * @class FDI
 * @extends FDIController
 * @description Main class for initializing and managing the FDI widget. Ensures singleton pattern implementation.
 */
export declare class FDI extends FDIController {
    constructor(options?: FDIOptions);
    /**
     * @method getOptions
     * @returns {FDIOptions} The current FDI configuration options
     * @description Retrieves the current options set for the FDI instance
     */
    getOptions(): FDIOptions;
    /**
     * @method setControl
     * @param {FDIControl} control - The control object to be set
     * @description Sets the control object for managing FDI's behavior
     */
    setControl(control: FDIControl): void;
    /**
     * @method getControl
     * @returns {FDIControl} The current control object
     * @description Retrieves the current control object for managing FDI's behavior
     */
    getControl(): FDIControl;
    /**
     * @method destroy
     * @description Destroys the current FDI instance and cleans up resources
     */
    destroy(): void;
    /**
     * @method ready
     * @description Signals that the FDI application is ready
     */
    ready(): void;
    /**
     * @method setExtensionControl
     * @param {FDIExtensionControl} control - The extension control object to be set
     * @description Sets the extension control object for Chrome extension functionality. Only works in Chrome extension environment.
     */
    setExtensionControl(control: FDIExtensionControl): void;
}
