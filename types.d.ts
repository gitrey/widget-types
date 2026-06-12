import { type getExtensionFeatureFlags } from '@/hooks/useExtensionFeatureFlag';
import { type CustomisedTemplateResponse } from '@/scribe-common/api/schema';
import { CodeSystem, LanguageCode, Region } from '@/scribe-common/api/schema/schema';
import { type CustomTheme } from '@/utils/constant';
import { type ReactNode } from 'react';
import { z } from 'zod';
import { type FDI } from './index';
type NavigatorConnection = {
    type?: string;
    effectiveType?: string;
};
export type { Region };
export type FDIRecordingStatus = 'RECORDING' | 'NOT_STARTED' | 'PAUSED' | 'STOPPED';
export interface FDILiveTranscription {
    /** The transcribed text from the audio chunk */
    text: string;
    /** Confidence score of the transcription (0-1) */
    confidence?: number;
    /** The session ID this transcription belongs to */
    sessionId: string;
    /** The chunk index (0-based) */
    chunkIndex?: number;
}
export type ButtonState = {
    label: ReactNode;
    variant: 'success' | 'destructive' | 'recording' | 'secondary';
    isHovering: boolean;
};
export type SessionDetails = {
    ehrApptId: string;
    createdTimeLocal: string;
};
declare global {
    interface Window {
        FDI: typeof FDI;
        fdiOptions: FDIOptions;
        fdiInstance: FDI;
        fdiInternals: FDIInternals;
        webkitAudioContext: typeof AudioContext;
    }
    interface Navigator {
        connection?: NavigatorConnection;
        mozConnection?: NavigatorConnection;
        webkitConnection?: NavigatorConnection;
    }
}
export declare const enum FDIFrameDragEvent {
    FDI_FRAME_DRAG_START = "FDI_FRAME_DRAG_START",
    FDI_FRAME_DRAG_MOUSEMOVE = "FDI_FRAME_DRAG_MOUSEMOVE",
    FDI_FRAME_DRAG_END = "FDI_FRAME_DRAG_END"
}
export interface FDIControl {
    setRecorderVisibility: (visible: boolean) => void;
    close: (keepSession: boolean) => void;
    closeWithConfirmation: (keepSession: boolean) => void;
    setOnResizeCallback: (callback: (expanded: boolean) => void) => void;
    setPushNoteCallback: (callback: (fdiNote: FDINote) => void) => void;
    setPushDocumentCallback: (callback: (fdiNote: FDIDocument) => void) => void;
    setOnSessionStartedCallback: (callback: (sessionId: string) => void) => void;
    setOnTokenExpiredCallback: (callback: () => void) => void;
    setTemplate: (template: Template) => void;
    setSectionalData: (sectionalData: FDISectionalData) => void;
    setOnCloseCallback: (callback: () => void) => void;
    setOnOpenCallback: (callback: () => void) => void;
    setToken: (token: string) => void;
    setPatient: (patientInfo: PatientInfo) => void;
    setSessionId: (sessionId: string) => Promise<void>;
    setSessionByEhrApptId: (ehrApptId: string) => Promise<void>;
    setSessionDetails: (sessionDetails: SessionDetails) => void;
    setStartNewSession: (startNewSession: boolean) => void;
    setContext: (context: FDIContext) => void;
    setOnRecordingStarted: (callback: () => void) => void;
    setOnRecordingPaused: (callback: () => void) => void;
    setOnRecordingStopped: (callback: () => void) => void;
    setOnRecordingStatusChange: (callback: (status: FDIRecordingStatus) => void) => void;
    setOnLiveTranscriptionCallback: (callback: (transcription: FDILiveTranscription) => void) => void;
    setIsPushNoteDisabled: (isPushNoteDisabled: boolean, data: {
        reason: string;
        type?: 'PushNoteFailed';
    } | undefined) => void;
    /** Accuro specific */
    setOnTriggerUploadAttachmentCallback: (callback: () => void) => void;
    refreshContextAttachments: () => Promise<void>;
    refreshSession: () => Promise<void>;
    startPendingAttachments: () => void;
    /** Carestack specific */
    setSendFDILicenseCallback: (callback: () => void) => void;
    /** Zedmed specific */
    startRecording: () => void;
    stopRecording: (options?: {
        reason?: string;
    }) => void;
    toast: (options: {
        title: string;
        description: string;
        type: 'success' | 'error' | 'info';
    }) => void;
}
export interface LanguageOptions {
    inputDefault?: LanguageCode;
    outputDefault?: LanguageCode;
}
export declare const LanguageOptionsSchema: z.ZodObject<{
    inputDefault: z.ZodOptional<z.ZodNativeEnum<typeof LanguageCode>>;
    outputDefault: z.ZodOptional<z.ZodNativeEnum<typeof LanguageCode>>;
}, "strip", z.ZodTypeAny, {
    inputDefault?: LanguageCode;
    outputDefault?: LanguageCode;
}, {
    inputDefault?: LanguageCode;
    outputDefault?: LanguageCode;
}>;
export type ValidatedLanguageOptions = z.infer<typeof LanguageOptionsSchema>;
export type FDITheme = 'light' | 'dark' | 'new';
export interface CustomizationOptions {
    pushNoteAction?: {
        label: string;
        onAction: () => void;
    };
    pushDocumentAction?: {
        label: string;
        onAction: () => void;
    };
}
export interface FDIOptions {
    dev?: boolean;
    region?: Region;
    displayLanguage?: LanguageCode;
    productName?: string;
    frame?: HTMLIFrameElement;
    language?: LanguageOptions;
    theme?: FDITheme;
    display?: DisplayOptions;
    result?: ResultOptions;
    /**
     * When set to true, requires patient consent confirmation before
     * recording can start. This adds an additional consent verification step
     * to comply with patient privacy requirements.
     */
    enforcePatientConsent?: boolean;
    token?: string;
    target?: string | HTMLElement;
    onReady?: () => void;
    onInit?: () => void;
    license?: FDILicenseInfo;
    customization?: CustomizationOptions;
    extension?: FDIExtensionOptions;
}
export interface FDILicenseInfo {
    startDate: string;
    endDate: string;
    freeTrialDays: number;
    trialEndDate: string;
    latestTier: string;
}
export interface FDIExtensionOptions {
    isActiveOnOtherTab?: boolean;
    enableMagicPaste?: boolean;
    enableInlineDictation?: boolean;
    enableSidepanel?: boolean;
    enableReplaceMagicPaste?: boolean;
}
export interface FDIContext {
    context: string;
    mode?: 'append' | 'overwrite';
}
/**
 * Zod schema for validating FDIContext input
 * Ensures mode is either undefined, 'append', or 'overwrite'
 */
export declare const FDIContextSchema: z.ZodObject<{
    context: z.ZodString;
    mode: z.ZodOptional<z.ZodEnum<["append", "overwrite"]>>;
}, "strip", z.ZodTypeAny, {
    context?: string;
    mode?: "append" | "overwrite";
}, {
    context?: string;
    mode?: "append" | "overwrite";
}>;
/**
 * Type inferred from Zod schema (should match FDIContext)
 */
export type ValidatedFDIContext = z.infer<typeof FDIContextSchema>;
export interface Section {
    section_id: string;
    section_name: string;
}
export declare const SectionSchema: z.ZodObject<{
    section_id: z.ZodString;
    section_name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    section_id?: string;
    section_name?: string;
}, {
    section_id?: string;
    section_name?: string;
}>;
export declare const RegionSchema: z.ZodPipeline<z.ZodString, z.ZodNativeEnum<typeof Region>>;
export declare const SectionalDataSchema: z.ZodOptional<z.ZodObject<{
    enabled: z.ZodBoolean;
    availableSections: z.ZodEffects<z.ZodArray<z.ZodObject<{
        section_id: z.ZodString;
        section_name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        section_id?: string;
        section_name?: string;
    }, {
        section_id?: string;
        section_name?: string;
    }>, "many">, {
        section_id?: string;
        section_name?: string;
    }[], {
        section_id?: string;
        section_name?: string;
    }[]>;
}, "strip", z.ZodTypeAny, {
    enabled?: boolean;
    availableSections?: {
        section_id?: string;
        section_name?: string;
    }[];
}, {
    enabled?: boolean;
    availableSections?: {
        section_id?: string;
        section_name?: string;
    }[];
}>>;
export type ValidatedSection = z.infer<typeof SectionSchema>;
export type ValidatedSectionalData = z.infer<typeof SectionalDataSchema>;
export declare const CodeSystemUnitSchema: z.ZodObject<{
    codeSystem: z.ZodNativeEnum<typeof CodeSystem>;
}, "strip", z.ZodTypeAny, {
    codeSystem?: CodeSystem;
}, {
    codeSystem?: CodeSystem;
}>;
export type CodeSystemUnit = z.infer<typeof CodeSystemUnitSchema>;
export declare const ClinicalCodingSchema: z.ZodOptional<z.ZodObject<{
    enabled: z.ZodBoolean;
    codeSystems: z.ZodEffects<z.ZodArray<z.ZodObject<{
        codeSystem: z.ZodNativeEnum<typeof CodeSystem>;
    }, "strip", z.ZodTypeAny, {
        codeSystem?: CodeSystem;
    }, {
        codeSystem?: CodeSystem;
    }>, "many">, {
        codeSystem?: CodeSystem;
    }[], {
        codeSystem?: CodeSystem;
    }[]>;
}, "strip", z.ZodTypeAny, {
    enabled?: boolean;
    codeSystems?: {
        codeSystem?: CodeSystem;
    }[];
}, {
    enabled?: boolean;
    codeSystems?: {
        codeSystem?: CodeSystem;
    }[];
}>>;
export type ValidatedClinicalCoding = z.infer<typeof ClinicalCodingSchema>;
export interface SectionOutput {
    section_id: string;
    section_name: string;
    content: string;
}
export type FDISectionalData = {
    enabled: boolean;
    availableSections: Array<Section>;
};
export type FDIClinicalCoding = {
    enabled: boolean;
    codeSystems?: Array<CodeSystemUnit>;
};
export interface ResultOptions {
    includeTranscript?: boolean;
    includeObservations?: boolean;
    noteFormat?: 'markdown' | 'html';
    hideNoteTabWhenUsingCustomTemplate?: boolean;
    /**
     * @deprecated Use `clinicalCoding.enabled` instead for better control.
     * When set to true, includes all clinical coding data (ICD-10, SNOMED codes)
     * in the pushed notes and documents without code system filtering.
     * This enriches the payload with standardized medical codes for diagnoses and procedures.
     */
    includeClinicalCoding?: boolean;
    sectionalData?: FDISectionalData;
    clinicalCoding?: FDIClinicalCoding;
}
export interface DisplayOptions {
    theme?: FDITheme;
    customTheme?: CustomTheme;
    fitToWindow?: boolean;
    expandable?: boolean;
    maxHeight?: number;
    position?: 'bottom-right' | 'bottom-left' | 'top-left' | 'top-right';
    paddingX?: number;
    paddingY?: number;
    draggable?: boolean;
    zIndex?: string;
    backgroundColor?: string;
    expandIconColor?: string;
    showNewSessionButton?: boolean;
    showPowerOffButton?: boolean;
    /**
     * When true, prevents manual typing into patient input fields in the widget UI.
     * Does not block programmatic updates or patient linking flows.
     * Takes effect in addition to EHR-originated data being read-only.
     */
    disableManualPatientInput?: boolean;
}
export type FDIState = 'READY' | 'DESTROYED';
export interface FDIInternals {
    baseUrl: string;
    options: FDIOptions;
    control: FDIControl;
    state: FDIState;
    created: boolean;
}
export type ClinicalCodeUnit = {
    code: string;
    codeName: string;
    codeSystem: string;
};
export type ClinicalCodesSchema = Array<{
    primaryCode: ClinicalCodeUnit;
    similarCodes?: Array<ClinicalCodeUnit>;
}>;
export interface FDINote {
    patientInfo?: PatientInfo;
    transcript?: string;
    noteData?: string | Template;
    sessionId?: string;
    clinicalCodes?: ClinicalCodesSchema;
    sectionalData?: {
        data: Array<SectionOutput>;
    };
    observations?: CustomisedTemplateResponse;
}
export interface FDIDocument {
    patientInfo?: PatientInfo;
    title: string;
    content: string;
    sessionId?: string;
    clinicalCodes?: ClinicalCodesSchema;
}
export interface TemplatesData {
    templates: Template[];
}
export interface Template {
    /**
     * @deprecated in V2, use `template` instead
     */
    content: string;
    template: string;
    responses: (TemplateQuestion | StructuredTemplateQuestion)[];
    questions?: StructuredTemplateQuestion[];
    summary?: string;
    summaryRequired?: boolean;
    metadata?: string[] | null;
}
export interface StructuredTemplateQuestion {
    questionId: string;
    question: string;
    answerType: string;
    answerOptions?: StructuredTemplateQuestionAnswerOption[];
    answer?: StructuredTemplateQuestionAnswer[];
    dateFormat?: string;
    description?: string;
    repeatable: boolean;
    childQuestions?: StructuredTemplateQuestion[];
}
export interface StructuredTemplateQuestionAnswerOption {
    value: string;
    metadata?: {
        [key: string]: string;
    };
}
export interface StructuredTemplateQuestionAnswer {
    value?: string;
    additionalDetails?: string;
}
export interface TemplateQuestion {
    answer?: string[];
    answerOptions: string[];
    answerType: AnswerType;
    dateFormat?: string;
    question: string;
    questionId: string;
}
export type AnswerType = 'DateResponse' | 'MultipleResponse' | 'SingleResponse' | 'TextArea';
export declare const ALLOWED_GENDERS: readonly ["male", "female", "other", "unknown"];
export type GenderType = (typeof ALLOWED_GENDERS)[number];
export type PatientInfo = {
    id: string;
    name: string;
    gender?: GenderType;
    dob?: string;
};
export interface FDIOpenParams {
    template?: Template;
    patient?: PatientInfo;
    sessionId?: string;
    ehrApptId?: string;
    startNewSession?: boolean;
    context?: string;
}
