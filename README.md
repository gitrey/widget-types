# @fdi/widget-types

[![npm version](https://img.shields.io/npm/v/@fdi/widget-types.svg?style=flat-square)](https://www.npmjs.com/package/@fdi/widget-types)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=flat-square)](https://opensource.org/licenses/Apache-2.0)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%23007ACC.svg?style=flat-square)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-Passing-success.svg?style=flat-square)](./__tests__)

Fully functional and comprehensive TypeScript type definitions, interface specifications, and Controller APIs for embedding and interacting with the **FDI Health Scribing & AI Notes Widget**.

This package provides complete type safety, Zod schema schemas, and API documentation for healthcare partners, EMR/EHR vendors, and third-party developers integrating the FDI web widget into their applications.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Core Abstractions & Concepts](#-core-abstractions--concepts)
  - [1. `FDIController`](#1-fdicontroller)
  - [2. `FDI` Instance](#2-fdi-instance)
  - [3. `FDIOptions`](#3-fdioptions)
- [Comprehensive Usage Guides](#-comprehensive-usage-guides)
  - [Initialization & Opening the Widget](#initialization--opening-the-widget)
  - [Handling EMR Push Events (Notes & Documents)](#handling-emr-push-events-notes--documents)
  - [Live Audio Recording & Real-time Transcription](#live-audio-recording--real-time-transcription)
  - [Session Context & Attachment Management](#session-context--attachment-management)
- [Detailed API Reference](#-detailed-api-reference)
  - [Global `Window` Namespace](#global-window-namespace)
  - [Event Enums](#event-enums)
  - [Important Data Interfaces](#important-data-interfaces)
- [Development & Testing](#-development--testing)
- [License](#-license)

---

## 🌟 Overview

The FDI Widget allows you to embed FDI's automated clinical scribing, dictation, and medical documentation generation right inside your EMR/EHR window or healthcare web platform. 

By utilizing `@fdi/widget-types`, your development team gains:
- **Flawless Type Safety**: Catch configuration errors at compile-time.
- **Rich IDE Autocomplete**: Full JSdoc documentation and property specifications for all widget triggers, lifecycle callbacks, and payload structures.
- **Extensible Interfaces**: Seamlessly interact with multi-modal medical inputs, clinical coding enrichment (ICD/CPT/SNOMED), and real-time audio streams.

---

## 📦 Installation

Install the package as a development dependency in your existing TypeScript project:

```bash
# Using npm
npm install --save-dev @fdi/widget-types

# Using pnpm
pnpm add -D @fdi/widget-types

# Using yarn
yarn add -D @fdi/widget-types
```

---

## 🚀 Quick Start

Here is a complete, real-world example of importing the definitions and orchestrating the FDI widget inside a modern web application:

```typescript
import { FDIController, type FDIOptions, type FDINote, type FDIDocument } from '@fdi/widget-types';

// 1. Define custom options for your EMR integration
const fdiConfig: FDIOptions = {
  region: 'AU',
  theme: 'dark',
  displayLanguage: 'en',
  display: {
    fitToWindow: true,
    expandable: true,
  },
  customization: {
    pushNoteAction: {
      label: 'Save to EMR Encounter',
      icon: 'arrow-right-to-bracket',
    },
  },
  onReady: () => {
    console.log('✅ FDI Widget is fully loaded and ready.');
  }
};

// 2. Initialize the controller
async function startHealthcareSession(patientId: string, appointmentId: string) {
  // Pass configuration
  window.fdiOptions = fdiConfig;
  await FDIController.init();

  // Setup Push Data event listener (When doctor clicks "Push" in FDI)
  FDIController.onPushData((notePayload: FDINote) => {
    console.log('📌 Received Note Payload:', notePayload);
    // TODO: Save transcript or structured clinical note to your EMR database
  });

  // Setup Push Document listener (Referral letters, certificates, etc.)
  FDIController.onPushDocument((docPayload: FDIDocument) => {
    console.log('📄 Received Document Payload:', docPayload.title, docPayload.content);
    // TODO: Attach PDF or rich text document to the patient record
  });

  // 3. Open the widget for a specific patient
  await FDIController.open({
    sessionId: `session_${appointmentId}`,
    patient: {
      id: patientId,
      name: { first_name: 'Jane', last_name: 'Doe' },
      dob: '1985-06-15',
      gender: 'female'
    }
  });
}
```

---

## 🧠 Core Abstractions & Concepts

### 1. `FDIController`
`FDIController` is a static orchestration class designed to manage the lifecycle and interaction points of the embedded iframe widget.
- **Lifecycle Management**: `.init()`, `.open()`, `.close()`, `.refreshSession()`
- **EMR Event Listeners**: `.onPushData()`, `.onPushDocument()`, `.onTokenExpired()`, `.onSessionStarted()`
- **Audio/Recording Subsystem**: `.startRecording()`, `.stopRecording()`, `.onRecordingStatusChange()`, `.onLiveTranscription()`

### 2. `FDI` Instance
The `FDI` class represents the active singleton instance executing under the hood. It extends `FDIController` and holds internal state, direct control bridges (`FDIControl`), and Chrome extension communication ports.

### 3. `FDIOptions`
The definitive configuration object injected into `window.fdiOptions` or passed during construction. It supports granular customization covering UI themes (`light`, `dark`, `new`), output clinical languages, EHR licensing tiers, and visual presentation.

---

## 🛠 Complete Usage Guides

### Handling EMR Push Events (Notes & Documents)
When a clinician finishes drafting their SOAP note, consultative report, or referral letter, they can push the structured content directly to your platform.

```typescript
import { FDIController, type FDINote, type FDIDocument } from '@fdi/widget-types';

// Subscribe to structured clinical notes
FDIController.onPushData((note: FDINote) => {
  const { transcript, noteData, patientInfo } = note;
  
  if (typeof noteData === 'string') {
    // Plain text markdown note
    updateChart(patientInfo?.id, noteData);
  } else if (noteData?.template_id) {
    // Sectional SOAP or customized template response
    updateChartSectioned(patientInfo?.id, noteData);
  }
  
  FDIController.toast({
    title: 'Success',
    description: 'Note successfully imported into EMR chart.',
    type: 'success'
  });
});

// Subscribe to legal / formal documents
FDIController.onPushDocument((doc: FDIDocument) => {
  saveAttachedDocument({
    patientId: doc.patientInfo?.id,
    title: doc.title,
    rawHtml: doc.content
  });
});
```

### Live Audio Recording & Real-time Transcription
`@fdi/widget-types` exposes rich hooks for listening to audio state transitions and receiving real-time speech-to-text transcript chunks while the clinical encounter is taking place.

```typescript
import { FDIController, type FDIRecordingStatus, type FDILiveTranscription } from '@fdi/widget-types';

// Track recording states ('RECORDING' | 'NOT_STARTED' | 'PAUSED' | 'STOPPED')
FDIController.onRecordingStatusChange((status: FDIRecordingStatus) => {
  console.log(`🎙 Recording State shifted to: ${status}`);
  updateRecordingUIIndicator(status);
});

// Receive streaming live transcription chunks
FDIController.onLiveTranscription((chunk: FDILiveTranscription) => {
  console.log(`[Confidence: ${chunk.confidence}] "${chunk.text}"`);
  appendLiveCaption(chunk.text);
});

// Programmatically trigger recording
function startExam() {
  FDIController.startRecording();
}

function stopExam() {
  FDIController.stopRecording({ reason: 'Encounter finished by EMR host' });
}
```

### Session Context & Attachment Management
Inject historical context, prior patient notes, or laboratory attachments to enable FDI's AI to generate highly contextual, customized clinical outputs.

```typescript
import { FDIController, type FDIContext } from '@fdi/widget-types';

async function injectPriorPatientHistory(pastChartSummary: string) {
  const contextPayload: FDIContext = {
    context: `Past Medical History: ${pastChartSummary}`,
    mode: 'append' // 'append' or 'overwrite'
  };

  // Set the context
  FDIController.setContext(contextPayload);
  
  // Refresh attachments on the remote server
  FDIController.startPendingAttachments();
  await FDIController.refreshContextAttachments();
}
```

---

## 🔍 Detailed API Reference

### Global `Window` Namespace

The following globally declared extensions exist on the browser `window` object when FDI is active:

```typescript
declare global {
  interface Window {
    FDI: typeof FDI;
    fdiOptions: FDIOptions;
    fdiInstance: FDI;
    fdiInternals: FDIInternals;
    webkitAudioContext: typeof AudioContext;
  }
}
```

### Event Enums

#### `FDIFrameDragEvent`
Used for handling customized frame dragging events across window borders:
- `FDIFrameDragEvent.FDI_FRAME_DRAG_START`
- `FDIFrameDragEvent.FDI_FRAME_DRAG_MOUSEMOVE`
- `FDIFrameDragEvent.FDI_FRAME_DRAG_END`

### Important Data Interfaces

#### `PatientInfo`
```typescript
interface PatientInfo {
  id: string;
  name: {
    first_name: string;
    last_name?: string;
  };
  gender?: 'male' | 'female' | 'other';
  dob?: string; // YYYY-MM-DD
}
```

#### `Template`
```typescript
interface Template {
  template_id?: string;
  template_name: string;
  description?: string;
  sections?: Array<{
    section_id?: string;
    section_name: string;
    description?: string;
    items?: Array<string>;
  }>;
}
```

#### `SectionalData` & `ClinicalCoding`
```typescript
interface FDISectionalData {
  enabled: boolean;
  availableSections: Array<Section>;
}

interface FDIClinicalCoding {
  enabled: boolean;
  codeSystems?: Array<CodeSystemUnit>; // e.g., ICD-10, SNOMED-CT, CPT
}
```

---

## 🧪 Development & Testing

This project includes a comprehensive suite of unit tests to verify exact type correctness, singleton controller execution behavior, and Zod schema validations.

To run the testing suite locally:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Execute the test runner:
   ```bash
   npm test
   ```

The tests validate:
- **Static Class Methods**: Proper instantiation, promise resolution, and event delegation in `FDIController`.
- **Zod Schema Compilation**: Integrity of `FDIContextSchema` and `LanguageOptionsSchema`.
- **Type Checking**: Verification that all required callback signatures and payloads match strictly.

---

## 📄 License

Licensed under the **Apache License, Version 2.0** (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
