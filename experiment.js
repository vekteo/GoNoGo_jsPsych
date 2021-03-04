/* 
Created by Teodora Vekony (vekteo@gmail.com)
MEMO Team (PI: Dezso Nemeth)
Lyon Neuroscience Research Center
Universite Claude Bernard Lyon 1

Github:https://github.com/vekteo/GoNoGo_JSPsych
*/

/*************** VARIABLES ***************/

let timeline = [];
let trialNumber = 0;
const startImage = ["static/images/start.png"]
const imagesP = ["static/images/p1.png", "static/images/p2.png", "static/images/p3.png", "static/images/p4.png"];
const imagesR = ["static/images/r1.png", "static/images/r2.png", "static/images/r3.png", "static/images/r4.png"];
const subjectId = jsPsych.randomization.randomID(15)

/* timeline elements */

const instructions = {
    type: "instructions",
    pages: [
        `<h1>${language.welcomePage.welcome}</h1><br><p>${language.welcomePage.clickNext}</p>`,
        `<p>${language.instruction.blueStar}</p><p>${language.instruction.PorR}</p><p>${language.instruction.pressSpace}</p><p>${language.instruction.dontPress}</p><img style="width: 720px; height:405px" src=${language.instruction.img} /><p>${language.instruction.ready}</p>`
    ],
    data: {test_part: "instruction"},
    show_clickable_nav: true,
    button_label_next: language.button.next,
    button_label_previous: language.button.previous
}

const practiceStart = {
    type: "html-keyboard-response",
    stimulus: `<p>${language.practice}</p>`,
    data: {test_part: "practice_start"}
};  


const taskStart = {
    type: "html-keyboard-response",
    stimulus: `<p>${language.task.begin}</p><br><p>${language.task.ready}</p>`,
    data: {test_part: "start_task"}
};  

const instructionChange = {
    type: 'instructions',
    pages: [
    `<h2 style='color: red'>${language.instructionChange.attention}</h2><br><p>${language.instructionChange.change}</p><br><p>${language.instructionChange.pressSpace}</p><p>${language.instructionChange.dontPress}</p><img style="width: 720px; height:405px" src=${language.instructionChange.img} /><p><p>${language.instruction.ready}`
    ],
    data: {test_part: "instruction"},
    show_clickable_nav: true,
    button_label_next: language.button.next,
    button_label_previous: language.button.previous
} 

const endTask = {
    type: "html-keyboard-response",
    data: {test_part: "debrief"},
    stimulus: function() {
        const trials = jsPsych.data.get().filter({is_practice: 0}).count()
        const correctTrials = jsPsych.data.get().filter({correct: 1, is_practice: 0}).count();
        return `<h1>${language.end.end}</h1>
                    <br>
                    <p>${language.end.answer1}${((correctTrials/trials)*100).toFixed(0)}${language.end.answer2}</p>
                    <p>${language.end.thankYou}</p>`
        },
    trial_duration: 5000
}
  
const fixation = {
    type: 'image-keyboard-response',
    stimulus: 'static/images/start.png',
    choices: jsPsych.NO_KEYS,
    trial_duration: 1500,
    prompt: "<p class='placeholder'>Placeholder!</p>",
    on_start: function(trial) {
        let message;
        let lastTrial = jsPsych.data.get().last(1).values()[0];
        lastTrial.correct == 1 ? message = "<p class='correct'>" + `${language.feedback.correct}` + "</p>" : message = "<p class='wrong'>" + `${language.feedback.wrong}` + " </p>";
        lastTrial.is_practice == 1 ? trial.prompt = message : trial.prompt = "<p class='placeholder'>Placeholder!</p>";
        trial.test_part = "fixation"
    }
};

const practiceStimuliFirstPart = stimulusGenerator("P", "R", 1);
const stimuliFirstPart = stimulusGenerator("P", "R", 0);
const practiceStimuliSecondPart= stimulusGenerator("R", "P", 1);
const stimuliSecondPart = stimulusGenerator("R", "P", 0);

const trial = {
    type: 'image-keyboard-response',
    stimulus: jsPsych.timelineVariable('stimulus'),
    data: jsPsych.timelineVariable('data'),
    choices: ['space'],
    response_ends_trial: true,
    trial_duration: 500,
    prompt: "<p class='placeholder'>Placeholder!</p>",
    on_finish: function (data) { data.test_part = "stimulus" }
}
  
/*************** TIMELINE ***************/

const timelineElementStructure = {
    timeline: [fixation, trial],
    randomize_order: true,
}

const practiceFirstPart = {... timelineElementStructure, timeline_variables: practiceStimuliFirstPart, repetitions: 1}
const practiceSecondPart = {... timelineElementStructure, timeline_variables: practiceStimuliSecondPart, repetitions: 1}

const firstPart = {... timelineElementStructure, timeline_variables: stimuliFirstPart, repetitions: numberOfRepetitions}
const secondPart = {... timelineElementStructure, timeline_variables: stimuliSecondPart, repetitions: numberOfRepetitions}

jsPsych.data.addProperties({subject: subjectId});
timeline.push({type: "fullscreen", fullscreen_mode: true}, instructions, practiceStart, practiceFirstPart, taskStart, firstPart, instructionChange, practiceStart, practiceSecondPart, taskStart, secondPart, endTask, {type: "fullscreen", fullscreen_mode: false});

/*************** EXPERIMENT START AND DATA UPDATE ***************/

jsPsych.init({
    timeline: timeline,
    preload_images: [startImage, imagesR, imagesP, "static/images/instruction_en.gif", "static/images/instruction_hu.gif"],
    on_data_update: function() {
        let lastTrial = jsPsych.data.get().last(1).values()[0];
        if (lastTrial.position) {
            trialNumber++
            lastTrial.trial_number = trialNumber
            lastTrial.correct_key == lastTrial.key_press ? lastTrial.correct = 1 : lastTrial.correct = 0;
        }

        if(lastTrial.is_practice == 1 && lastTrial.trial_number == practiceFirstPart.timeline_variables.length*practiceFirstPart.repetitions) {
            trialNumber = 0;
        }

        if(lastTrial.is_practice == 0 && lastTrial.trial_number == firstPart.timeline_variables.length*firstPart.repetitions) {
            trialNumber = 0;
        }

        let interactionData = jsPsych.data.getInteractionData()
        const interactionDataOfLastTrial = interactionData.filter({'trial': jsPsych.data.get().last(1).values()[0].trial_index}).values();

        if (interactionDataOfLastTrial) {
        jsPsych.data.get().last(1).values()[0].browser_events = JSON.stringify(interactionDataOfLastTrial)
        }
    },
    on_close: function(){
        jsPsych.data.get().localSave("csv", "GNG_output_quitting.csv");
      },
    on_finish: function() {
      jsPsych.data.get().localSave("csv", "GNG_output.csv");
    }
  }); 