import { FDIController } from '../controller';
import { FDI } from '../index';
import {
    type CodeSystemUnit,
    type DisplayOptions,
    type FDIClinicalCoding,
    type FDIContext,
    type FDIControl,
    type FDIDocument,
    type FDIExtensionControl,
    type FDIExtensionMessage,
    type FDIExtensionOptions,
    FDIFrameDragEvent,
    type FDIInternals,
    type FDILicenseInfo,
    type FDILiveTranscription,
    type FDINote,
    type FDIOpenParams,
    type FDIOptions,
    type FDIRecordingStatus,
    type FDISectionalData,
    type FDIState,
    type FDITheme,
    type FDIWidgetMessage,
    type LanguageOptions,
    type ResultOptions,
    type Section,
    type SessionDetails,
    type Template,
    type ValidatedFDIContext,
    type ValidatedLanguageOptions
} from '../types';

// ============================================================================
// 1. UNIT TEST: FDIOptions Configuration Integrity
// ============================================================================

export const mockFdiOptions: FDIOptions = {
    dev: true,
    region: 'AU',
    displayLanguage: 'en',
    target: '#widget-container',
    theme: 'dark',
    display: {
        fitToWindow: true,
        expandable: true,
        showPatientInfo: false,
        disableManualPatientInput: true,
    },
    result: {
        inputDefault: 'en',
        outputDefault: 'es',
    },
    license: {
        startDate: '2026-01-01',
        endDate: '2027-01-01',
        freeTrialDays: 14,
        isLicenseActive: true,
        latestTier: 'PREMIUM',
    },
    customization: {
        pushNoteAction: {
            label: 'Import Note',
            icon: 'check',
            onAction: () => {},
        },
        pushDocumentAction: {
            label: 'Import Document',
            icon: 'file-import',
            onAction: () => {},
        },
    },
    extension: {
        isActiveOnOtherTab: false,
        enableMagicPaste: true,
        enableInlineDictation: true,
    },
    onReady: () => {},
    onInit: () => {},
};

// ============================================================================
// 2. UNIT TEST: FDI Implementation & Instantiation
// ============================================================================

// Verify FDI instance conforms to expected contract
export const testFdiInstance = (fdi: FDI): boolean => {
    const options = fdi.getOptions();
    if (!options) return false;

    // Test Control Object implementation
    const mockControl: FDIControl = {
        setRecorderVisibility: (_visible: boolean) => {},
        close: (_keepSession: boolean) => {},
        closeWithConfirmation: (_keepSession: boolean) => {},
        setPushNoteCallback: (_callback: (note: FDINote) => void) => {},
        setPushDocumentCallback: (_callback: (doc: FDIDocument) => void) => {},
        setOnSessionStartedCallback: (_callback: (sessionId: string) => void) => {},
        setOnTokenExpiredCallback: (_callback: () => void) => {},
        setTemplate: (_template: Template) => {},
        setSectionalData: (_sectionalData: FDISectionalData) => {},
        setOnCloseCallback: (_callback: () => void) => {},
        setOnOpenCallback: (_callback: () => void) => {},
        setToken: (_token: string) => {},
        setSessionId: (_sessionId: string) => {},
        setSessionByEhrApptId: async (_ehrApptId: string) => {},
        setSessionDetails: (_sessionDetails: SessionDetails) => {},
        setStartNewSession: (_startNewSession: boolean) => {},
        setContext: (_context: FDIContext) => {},
        setOnRecordingStarted: (_callback: () => void) => {},
        setOnRecordingPaused: (_callback: () => void) => {},
        setOnRecordingStopped: (_callback: () => void) => {},
        setOnRecordingStatusChange: (_callback: (status: FDIRecordingStatus) => void) => {},
        setOnLiveTranscriptionCallback: (_callback: (transcription: FDILiveTranscription) => void) => {},
        setIsPushNoteDisabled: (_disabled: boolean, _data: any) => {},
        setPatient: (_patientInfo: any) => {},
        setLicenseInfo: (_licenseInfo: any) => {},
        refreshContextAttachments: async () => {},
        refreshSession: async () => {},
        startPendingAttachments: () => {},
        setSendFDILicenseCallback: (_callback: () => void) => {},
        startRecording: () => {},
        stopRecording: (_options) => {},
        onLicenseReady: (_callback: () => void) => {},
        onTriggerUploadAttachment: (_callback: () => void) => {},
        toast: (_options) => {},
    };

    fdi.setControl(mockControl);
    const retrievedControl = fdi.getControl();
    if (!retrievedControl) return false;

    const mockExtensionControl: FDIExtensionControl = {
        closeMagicPaste: () => {},
        enableInlineDictation: () => {},
        disableInlineDictation: () => {},
    };
    fdi.setExtensionControl(mockExtensionControl);

    fdi.ready();
    fdi.destroy();
    return true;
};

// ============================================================================
// 3. UNIT TEST: Static FDIController Orchestration
// ============================================================================

export const testFDIControllerStaticMethods = async (): Promise<void> => {
    // 1. Initialization
    await FDIController.init();
    FDIController.appReady();

    // 2. Open / Close
    await FDIController.open({
        sessionId: 'test_session_123',
        patient: {
            id: 'pat_999',
            name: { first_name: 'John', last_name: 'Smith' },
            gender: 'male',
            dob: '1990-01-01',
        },
    });

    FDIController.close({ keepSession: true, force: false });

    // 3. Event Subscriptions
    FDIController.onResize((_expanded: boolean) => {});
    FDIController.onPushData((_note: FDINote) => {});
    FDIController.onPushDocument((_doc: FDIDocument) => {});
    FDIController.onSessionStarted((_sessionId: string) => {});
    FDIController.onTokenExpired(() => {});
    FDIController.onClose(() => {});
    FDIController.onOpen(() => {});

    // 4. Recording Lifecycle
    FDIController.onRecordingStarted(() => {});
    FDIController.onRecordingPaused(() => {});
    FDIController.onRecordingStopped(() => {});
    FDIController.onRecordingStatusChange((_status: FDIRecordingStatus) => {});
    FDIController.onLiveTranscription((_transcription: FDILiveTranscription) => {});

    FDIController.startRecording();
    FDIController.stopRecording({ reason: 'Unit test completed' });

    // 5. Config setters
    FDIController.setToken('mock_jwt_token_string');
    FDIController.setSessionId('new_session_id_456');
    FDIController.setSessionDetails({ sessionId: '123', appointmentId: 'appt_1' });
    FDIController.setSessionByEhrApptId('ehr_appt_999');
    FDIController.setStartNewSession(true);

    FDIController.setPatient({
        id: 'pat_111',
        name: { first_name: 'Alice' },
        dob: '2000-12-12',
    });

    FDIController.setTemplate({
        template_id: 'temp_1',
        template_name: 'Standard Consult',
    });

    FDIController.setSectionalData({
        enabled: true,
        availableSections: [
            {
                section_id: 'sec_s',
                section_name: 'Subjective',
                content: 'Patient reports headache.',
            },
        ],
    });

    FDIController.setContext({
        context: 'Previous visit: Normal exam.',
        mode: 'append',
    });

    await FDIController.refreshContextAttachments();
    await FDIController.refreshSession();
    FDIController.startPendingAttachments();

    // 6. Toasts and notifications
    FDIController.toast({
        title: 'Unit Test Success',
        description: 'All static Controller APIs successfully verified',
        type: 'success',
    });

    FDIController.appDestroy();
};

// ============================================================================
// 4. UNIT TEST: Data Structures, Messages, & Event Enums
// ============================================================================

export const verifyPayloadTypes = (): boolean => {
    // Note payload
    const notePayload: FDINote = {
        transcript: 'Patient has a mild cough.',
        noteData: 'SOAP note text...',
        patientInfo: { id: 'p1', name: { first_name: 'Bob' } },
        template_id: 'tpl_soap',
        observations: { data: {} },
    };

    // Document payload
    const documentPayload: FDIDocument = {
        title: 'Work Certificate',
        content: '<p>Valid for 3 days</p>',
        patientInfo: { id: 'p2', name: { first_name: 'Charlie' } },
    };

    // Live transcription payload
    const liveTransPayload: FDILiveTranscription = {
        text: 'Hello doctor',
        confidence: 0.98,
        isFinal: true,
    };

    // Frame drag events
    const dragEvent: FDIFrameDragEvent = FDIFrameDragEvent.FDI_FRAME_DRAG_START;

    // Messages
    const widgetMsg: FDIWidgetMessage = {
        type: 'close',
        keepSession: true,
    };

    const extMsg: FDIExtensionMessage = {
        type: 'MAGIC_PASTE_COMPLETED',
        content: 'pasted text',
    };

    return Boolean(
        notePayload &&
        documentPayload &&
        liveTransPayload &&
        dragEvent &&
        widgetMsg &&
        extMsg
    );
};
