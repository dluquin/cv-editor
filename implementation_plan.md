# Implementation Plan - UI/UX Overhaul & Date Fixes

# Goal Description
Transform the application into a premium-looking tool with tabbed navigation. Implement proper date pickers and ensure dates are stored/exported in `MM-YYYY` format as requested.

## User Review Required
> [!IMPORTANT]
> I will use `<input type="month">` for date fields. This provides a native date picker.
> **Format Conversion**: The native input uses `YYYY-MM`. I will implement a conversion layer to store and export dates as `MM-YYYY` (e.g., "04-1999").

## Proposed Changes

### Navigation & Layout
#### [MODIFY] [src/App.jsx](file:///Users/dluquin/cv-editor/src/App.jsx)
- Implement a `activeTab` state.
- Render a Tab navigation bar (Personal, Experience, Board, International, Specialization, Additional).
- Conditionally render the active component based on the selected tab.

### Date Handling
#### [MODIFY] [src/components/Experience.jsx](file:///Users/dluquin/cv-editor/src/components/Experience.jsx)
- Replace text inputs for dates with `<input type="month">`.
- Implement helper functions to convert between `MM-YYYY` (JSON) and `YYYY-MM` (Input).

#### [MODIFY] [src/components/BoardExperience.jsx](file:///Users/dluquin/cv-editor/src/components/BoardExperience.jsx)
- Apply the same date picker and conversion logic.

### Aesthetics (Premium Design)
#### [MODIFY] [src/index.css](file:///Users/dluquin/cv-editor/src/index.css)
- **Color Palette**: Use a more sophisticated palette (e.g., Slate/Indigo or deep blues with soft grays).
- **Typography**: Improve font weights and headings.
- **Tabs**: Style tabs to look modern (underline effect or pill shape).
- **Cards**: Add subtle shadows and hover effects.
- **Inputs**: Style inputs with better padding, focus states, and transitions.
- **Buttons**: Modernize button styles (gradients or flat design with shadow).

## Verification Plan

### Manual Verification
1.  **Tabs**: Click through each tab and verify the correct section is shown.
2.  **Date Picker**:
    - Click a date field. Verify a month/year picker appears.
    - Select a date (e.g., May 2023).
    - Verify the input shows the selected date.
    - **Export**: Export the JSON and verify the date is saved as `05-2023` (MM-YYYY).
3.  **Design**:
    - Visually inspect the app for "premium" feel.
    - Check responsiveness of tabs on smaller screens.
