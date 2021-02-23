//The Go vs. NoGo ratio is 80-20%

// The default number of trials is 160 in one block, that corresponds to 8 repetitions of 20 trials with 16:4 ratio (i.e., 80% or 128 Go and 20% or 32 NoGo trials)
// You can modify the number of trials by modifying the number of repetitons
// e.g. 6 repetions will result in 6*20 = 120 trials per block, 96 Go and 24 NoGo trials

const numberOfRepetitions = 8;
const language = en; //available languages : en, hus