function statCalculation (trial) {
    let numberOfTrials = jsPsych.data.get().filterCustom(function(data){ return data.is_practice === 0} ).count();
    let PBlock1 = jsPsych.data.get().filterCustom(function(data){ return data.is_practice === 0 && data.go_letter === "P" && data.RorP === "P"} );
    let RBlock1 = jsPsych.data.get().filterCustom(function(data){ return data.is_practice === 0 && data.go_letter === "P" && data.RorP === "R"} );
    let PBlock2 = jsPsych.data.get().filterCustom(function(data){ return data.is_practice === 0 && data.go_letter === "R" && data.RorP === "P"} );
    let RBlock2 = jsPsych.data.get().filterCustom(function(data){ return data.is_practice === 0 && data.go_letter === "R" && data.RorP === "R"} );
    let GoTrials = jsPsych.data.get().filterCustom(function(data){ return data.is_practice === 0 && data.GoNoGo === "Go"} );
    let NoGoTrials = jsPsych.data.get().filterCustom(function(data){ return data.is_practice === 0 && data.GoNoGo === "NoGo"} );

    let hit = GoTrials.filter({correct: 1}); 
    let miss = GoTrials.filter({correct: 0}); 
    let falseAlarm = NoGoTrials.filter({correct: 0});
    let correctRejection = NoGoTrials.filter({correct: 1});

    let phit;
    let pfa;
    if(miss.count() > 0) {
      phit = hit.count()/(miss.count()+hit.count())
    } else {
      phit = hit.count()-0.5/(miss.count()+hit.count())
    }

    if(falseAlarm.count() > 0) {
      pfa = falseAlarm.count()/(falseAlarm.count()+correctRejection.count())
    } else {
      pfa = 0.5/(falseAlarm.count()+correctRejection.count())
    }

    let normHit = NormSInv(phit)
    let normFa = NormSInv(pfa)

    //total scores

    trial.STAT_total_correct = jsPsych.data.get().filterCustom(function(data){ return data.is_practice === 0 && data.correct === 1 } ).count();
    trial.STAT_total_error = jsPsych.data.get().filterCustom(function(data){ return data.is_practice === 0 && data.correct === 0 } ).count();
    trial.STAT_mean_accuracy = trial.STAT_total_correct/numberOfTrials;
    trial.STAT_nr_correct_Go =  GoTrials.filter({correct: 1}).count();
    trial.STAT_nr_correct_NoGo =  NoGoTrials.filter({correct: 1}).count();
    trial.STAT_nr_incorrect_Go =  GoTrials.filter({correct: 0}).count();
    trial.STAT_nr_incorrect_NoGo =  NoGoTrials.filter({correct: 0}).count();
    trial.STAT_p_correct_Go = trial.STAT_nr_correct_Go/GoTrials.count();
    trial.STAT_p_correct_NoGo = trial.STAT_nr_correct_NoGo/NoGoTrials.count();
    trial.STAT_p_incorrect_Go = trial.STAT_nr_incorrect_Go/GoTrials.count();
    trial.STAT_p_incorrect_NoGo = trial.STAT_nr_incorrect_NoGo/NoGoTrials.count();
    trial.STAT_dprime = normHit-normFa;

    //mean RT per block

    trial.STAT_P_block_1_mean = PBlock1.select("rt").mean();
    trial.STAT_R_block_1_mean = RBlock1.select("rt").mean();
    trial.STAT_P_block_2_mean = PBlock2.select("rt").mean();
    trial.STAT_R_block_2_mean = RBlock2.select("rt").mean();

    //median RT per block

    trial.STAT_P_block_1_median = PBlock1.select("rt").median();
    trial.STAT_R_block_1_median = RBlock1.select("rt").median();
    trial.STAT_P_block_2_median = PBlock2.select("rt").median();
    trial.STAT_R_block_2_median = RBlock2.select("rt").median();

    //accuracy per block

    trial.STAT_P_block_1_accuracy = PBlock1.filter({correct: 1}).count()/PBlock1.count();
    trial.STAT_R_block_1_accuracy = RBlock1.filter({correct: 1}).count()/RBlock1.count();
    trial.STAT_P_block_2_accuracy = PBlock2.filter({correct: 1}).count()/PBlock2.count();
    trial.STAT_R_block_2_accuracy = RBlock2.filter({correct: 1}).count()/RBlock2.count();
}