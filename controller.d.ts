import { Heidi } from './index';
import { type HeidiContext, type HeidiControl, type HeidiDocument, type HeidiExtensionControl, type HeidiExtensionMessage, type HeidiLiveTranscription, type HeidiNote, type HeidiOpenParams, type HeidiOptions, type HeidiRecordingStatus, type HeidiSectionalData, type HeidiState, type HeidiWidgetMessage, type PatientInfo, type SessionDetails, type Template } from './types';
export declare class HeidiController {
    /** The singleton instance of the Heidi class. */
    static instance: Heidi;
    /** The base URL of the Heidi widget application. */
    static baseUrl: string;
    /** The target HTML element where the Heidi widget is rendered/attached. */
    static target: HTMLElement;
    /** The active clinical note template. */
    static template: Template | null;
    /** The currently selected patient demographics. */
    static patient: PatientInfo | null;
    /** The current active session ID. */
    static sessionId: string | null;
    /** The active EHR Appointment ID linked with the session. */
    static ehrApptId: string | null;
    /** Flag to control if a new session should be started on load. */
    static startNewSession: boolean | null;
    /** Additional contextual information or notes for the session. */
    static context: string | null;
    /** The library/widget version string. */
    static version: string;
    /** The configuration options initialized with the Heidi instance. */
    static options: HeidiOptions | undefined;
    /** Internal control bridge for communicating commands to the widget frame. */
    static control: HeidiControl | null;
    /** The operational state of the Heidi controller instance. */
    static state: HeidiState;
    /** Extension control interface for browser extension specific operations. */
    static extensionControl: HeidiExtensionControl | null;
    /**
     * Initializes the Heidi controller, establishing communication hooks and setup states.
     * @returns {Promise<void>} Resolves when the initial setup is complete.
     */
    static init(): Promise<void>;
    /**
     * Signals that the core application container/frame has completed loading and is ready.
     */
    static appReady(): void;
    /**
     * Completely destroys the Heidi controller context, cleaning up instance fields and DOM bindings.
     */
    static appDestroy(): void;
    /**
     * Opens Heidi and starts a new session.
     * @param params - open Heidi with a set custom template, patient information and a sessionId.
     */
    static open(params?: HeidiOpenParams): Promise<void>;
    /**
     * Closes Heidi.
     * @param params - close Heidi with a set of options.
     * @param params.keepSession - whether to keep the current session open.
     * @param params.force - whether to skip the confirmation modal.
     */
    static close(params?: {
        keepSession?: boolean;
        force?: boolean;
    }): void;
    /**
     * Triggered when a user resize the Heidi widget.
     * @param callback - a function called when the user resize the Heidi widget.
     */
    static onResize(callback: (expanded: boolean) => void): void;
    /**
     * Triggered when a user clicks `Push Document` in the Heidi widget.
     * @param callback - a function called when the user chooses to push document from the Heidi library to your EHR.
     */
    static onPushDocument(callback: (heidiDocument: HeidiDocument) => void): void;
    /**
     * Triggered when a user chooses to push notes from the Heidi library to your EHR.
     * @param callback - a function called when the user chooses to push notes from the Heidi library to your EHR.
     */
    static onPushData(callback: (heidiNote: HeidiNote) => void): void;
    /**
     * Triggered when a new Heidi Session is created.
     * @param callback - a function called when a new Heidi Session is created.
     */
    static onSessionStarted(callback: (sessionId: string) => void): void;
    /**
     * Triggered when the current Heidi token expires.
     * @param callback - a function called when the current Heidi token expires.
     */
    static onTokenExpired(callback: () => void): void;
    /**
     * Update the current token used by Heidi.
     * @param token - a valid Heidi JWT token.
     */
    static setToken(token: string): void;
    /**
     * Update the current sessionId used by Heidi.
     * @param sessionId - a valid Heidi sessionId.
     */
    static setSessionId(sessionId: string): void;
    /**
     * Sets the session details including appointment ID and creation time.
     * @param {SessionDetails} sessionDetails - The details of the clinical session.
     */
    static setSessionDetails(sessionDetails: SessionDetails): void;
    /**
     * Update the current sessionId used by Heidi.
     * @param ehrApptId - a valid EHR Appointment ID.
     */
    static setSessionByEhrApptId(ehrApptId: string): void;
    /**
     * Sets the widget to start a new session on load.
     */
    static setStartNewSession(startNewSession: boolean): void;
    /**
     * Programmatically disables or enables the push note button, with an optional error/reason payload.
     * @param {boolean} isPushNoteDisabled - If true, the push note button is disabled in the widget UI.
     * @param {object} [data] - Optional metadata payload containing context details.
     * @param {string} data.reason - The reason explaining why pushing notes is disabled.
     * @param {'PushNoteFailed'} [data.type] - The categorical type of disable action (e.g. failure notification).
     */
    static setIsPushNoteDisabled(isPushNoteDisabled: boolean, data?: {
        reason: string;
        type?: 'PushNoteFailed';
    } | undefined): void;
    /**
     * Triggered when the Heidi widget is closed.
     * @param callback - a function called when the Heidi widget is closed.
     */
    static onClose(callback: () => void): void;
    /**
     * Triggered when the user clicks start recording
     * @param callback
     */
    static onRecordingStarted(callback: () => void): void;
    /**
     * Triggered when the user clicks pause recording
     * @param callback
     */
    static onRecordingPaused(callback: () => void): void;
    /**
     * Triggered when the user clicks stop recording
     * @param callback
     */
    static onRecordingStopped(callback: () => void): void;
    /**
     * Triggered when the recording status changes in heidi widget
     * @param callback
     */
    static onRecordingStatusChange(callback: (status: HeidiRecordingStatus) => void): void;
    /**
     * Triggered when a live transcription chunk is received during recording.
     * This callback is called every time an audio chunk is uploaded and transcribed,
     * providing real-time access to transcription text.
     * @param callback - a function called with transcription data when a chunk is transcribed
     */
    static onLiveTranscription(callback: (transcription: HeidiLiveTranscription) => void): void;
    /**
     * Triggered when the Heidi widget is opened.
     * @param callback - a function called when the Heidi widget is opened.
     */
    static onOpen(callback: () => void): void;
    /**
     * Update the patient information for the current session.
     * @param patientInfo - patient information for the current patient in your EMR.
     */
    static setPatient(patientInfo: PatientInfo): void;
    /** Set the template for the current session
     * @param template - template for the current session
     * */
    static setTemplate(template: Template): void;
    /** Set the sectional data heidiOptions
     * @param sectionalData - sectional data information for the current session
     * */
    static setSectionalData(sectionalData: HeidiSectionalData): void;
    /**
     * Start recording for the current session.
     */
    static startRecording(): void;
    /**
     * Stops the active recording.
     * @param options
     */
    static stopRecording(options?: {
        reason?: string;
    }): void;
    /**
     * Sets the context for the current session
     * @param context
     */
    static setContext(context: HeidiContext): void;
    /**
     * Refreshes the current session context attachments from server by invalidating cached data
     * @returns Promise that resolves when the session context attachments have been refreshed
     */
    static refreshContextAttachments(): Promise<void>;
    /**
     * Refreshes current session by invalidating cached data
     * @returns Promise that resolves when the session has been refreshed
     */
    static refreshSession(): Promise<void>;
    /**
     * Sets the loading state for pending context attachments
     * This should be called before uploading attachments to show loading UI
     */
    static startPendingAttachments(): void;
    /**
     * Sets the callback for sending Heidi license to EHRs like Carestack
     * @param callback
     */
    static onLicenseReady(callback: () => void): void;
    /**
     * Sets the callback for triggering upload attachment open on EHR side
     * @param callback
     */
    static onTriggerUploadAttachment(callback: () => void): void;
    /**
     * Triggers a toast notification dialog inside the Heidi widget.
     * @param {object} params - The toast configuration parameters.
     * @param {string} params.title - The headline/title text for the toast notification.
     * @param {string} [params.description] - Optional sub-description text detail.
     * @param {'success' | 'error' | 'info'} params.type - The status type of the toast banner, determining its color theme.
     */
    static toast({ title, description, type, }: {
        title: string;
        description?: string;
        type: 'success' | 'error' | 'info';
    }): void;
    
}