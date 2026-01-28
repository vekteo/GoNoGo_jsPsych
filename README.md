# Go/No-Go Task (jsPsych)

This repository contains a Go/No-Go task. The task is implemented using [jsPsych](https://www.jspsych.org/) (de Leeuw, J. R., 2015) and is based on the design by Bezdjian et al. (2009).

---

## Task structure

Participants view a grid of four squares, each containing a blue star. Throughout the task, either the letter **P** or **R** appears in one of these squares. 

The task is divided into two main parts:

1. **Part one:** Participants press the `space` bar as quickly as possible when they see the letter **P** (Go) and withhold their response when they see the letter **R** (No-Go).
2. **Part two:** The rules reverse. Participants press `space` for the letter **R** (Go) and withhold their response for the letter **P** (No-Go).

### Trial details
Each part begins with a 20-trial practice session featuring accuracy feedback. The main task for each part consists of 160 trials with an 80:20 ratio of Go to No-Go stimuli. Each stimulus is displayed for 500 ms (or until response) with an Inter-Stimulus Interval (ISI) of 1500 ms. At the conclusion of the task, overall accuracy is displayed and data is automatically downloaded in `.csv` format.

---

## Output data fields

The generated `.csv` file includes the following columns:

| Variable | Description |
| :--- | :--- |
| **success** | Boolean indicating if fullscreen mode was successfully toggled. |
| **trial_type** | The jsPsych trial type (e.g., `fullscreen`, `instructions`). |
| **trial_index** | Cumulative index of all task events and instructions. |
| **time_elapsed** | Total time elapsed since the script started (ms). |
| **subject** | Random 15-character ID (online) or a customized number (offline). |
| **session** | Customized session number (offline version only). |
| **internal_code_id** | The internal node ID of the specific trial. |
| **browser_events** | Logs of events like `fullscreenenter`, `fullscreenexit`, or `blur`. |
| **view_history** | Viewing duration for the instruction screens. |
| **rt** | Reaction time in milliseconds. |
| **stimulus** | The HTML representation of the stimulus presented. |
| **key_press** | The numeric code of the key pressed. |
| **RorP** | Indicates which letter was displayed (**P** or **R**). |
| **GoNoGo** | Label for the required response type. |
| **position** | Stimulus location (1: top-left, 2: top-right, 3: bottom-left, 4: bottom-right). |
| **correct_key** | The required key code (32 for `space`, null for No-Go). |
| **is_practice** | 1 if the trial was practice, 0 if it was the main task. |
| **goLetter** | Identifies the target letter for the current task block. |
| **trial_number** | The trial count within the current block (1–20 or 1–160). |
| **correct** | 1 if the response was correct, 0 if incorrect. |

---

## Configuration

The `parameters.js` file allows for the following modifications:

1. **numberOfRepetitions:** Adjusts the number of 20-trial blocks. The default is `8` (resulting in 160 trials per part).
2. **language:** Set the task language to English (`en`) or Hungarian (`hu`).

---

## Getting started

To run the task, open the `index.html` file in either the `offline` or `online` folder. The offline version allows you to manually input subject and session numbers, while the online version generates a random subject ID. 

### Browser requirements
The task is compatible with most modern browsers. Please note that **Safari** and **Internet Explorer** are not supported.
