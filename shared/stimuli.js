function stimulusGenerator(go, nogo, isPractice) {
    const stimuli = [];
    let goImage;
    let noGoImage;

    if (go === "P") {
        goImage = imagesP;
        noGoImage = imagesR;
    } else {
        goImage = imagesR;
        noGoImage = imagesP;
    }
    
    //Go stimuli
    for (i = 0; i < 16; i ++) {
        const newStimulus = {stimulus: goImage[i%4], data: {RorP: go, GoNoGo: "Go", position: (i%4)+1, correct_key: 32, is_practice: isPractice, go_letter: go}}
        stimuli.push(newStimulus)
    }

    //NoGo stimuli
    for (i = 0; i < 4; i ++) {
        const newStimulus = {stimulus: noGoImage[i], data: {RorP: nogo, GoNoGo: "NoGo", position: i+1, correct_key: null, is_practice: isPractice, go_letter: go}}
        stimuli.push(newStimulus)
    }
    return stimuli
}