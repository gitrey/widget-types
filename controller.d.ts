import { Heidi } from './index';
import { type HeidiContext, type HeidiControl, type HeidiDocument, type HeidiExtensionControl, type HeidiExtensionMessage, type HeidiLiveTranscription, type HeidiNote, type HeidiOpenParams, type HeidiOptions, type HeidiRecordingStatus, type HeidiSectionalData, type HeidiState, type HeidiWidgetMessage, type PatientInfo, type SessionDetails, type Template } from './types';
export declare class HeidiController {
    static instance: Heidi;
    static baseUrl: string;
    static target: HTMLElement;
    static template: Template | null;
    static patient: PatientInfo | null;
    static sessionId: string | null;
    static ehrApptId: string | null;
    static startNewSession: boolean | null;
    static context: string | null;
    static version: string;
    static options: HeidiOptions | undefined;
    static control: HeidiControl | null;
    static state: HeidiState;
    static extensionControl: HeidiExtensionControl | null;
    static init(): Promise<void>;
    static appReady(): void;
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
    static toast({ title, description, type, }: {
        title: string;
        description?: string;
        type: 'success' | 'error' | 'info';
    }): void;
    
}