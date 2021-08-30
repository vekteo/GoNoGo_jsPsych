# GoNoGo_JSPsych

<i>Created by the MEMO Team of Lyon Neuroscience Research Center (CRNL) (PI: Dezso Nemeth)</i>

A Go/NoGo Task created with JSPsych <a href="https://link.springer.com/article/10.3758/s13428-014-0458-y">de Leeuw, J. R., 2015</a>., based on the implementation of <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2757760/">Bezdjian et al. (2009)</a>.

<h2>Structure of the Task</h2>
A grid of four squares appears on the screen. A blue star appears in each squares. From time to time, a <strong>P</strong> or an <strong>R</strong> letter appears in one of the four squares. In the first part of  the task, the task is to press the <strong>space</strong> button as soon as possible, when they see the letter P (Go). When an R appears, they do not have to press any button, i.e., they have to withhold their responses (No-Go). In the second part of the task, they have to press <strong>space</strong> when they see an R, and they have to withhold their responses when they see a P.

The task starts with a 20-trial practice session. Here, the user receives feedback whether their answer was correct. After that, the task begins, and the users don't receive feedback on their responses anymore. The first part consist of 160 trials. 128 of the 160 trials are Go-trials, and 32 of them are No-Go-trials. The ratio of the Go:No-Go trials are therefore 80:20. Each trial appears on the screen for 500 ms (or until response) with an interstimulus interval of 1500 ms.

At the end of the first part, the new instructions are presented. After that, a 20-trial practice session starts again with feedback. Then the second part starts which contains again 160 trials with (80% of Go and 20% of No-Go responses).

At the end of the task, a feedback about the overall accuracy is presented on the screen, and the data are downloaded to the local machine in .csv format.

<h2>Output file</h2>
<ul>
 <li><strong>success:</strong> whether fullscreen mode was successfully started/ended (true or false)</li>
 <li><strong>trial_type:</strong> JSPSych trialtype of the given trial (fullscreen, instructions or image-keyboard-response)</li>
 <li><strong>trial_index:</strong> the number of the given trials (all events considered, even instructions, feedbacks!)</li>
 <li><strong>time_elapsed:</strong> the time elapsed from the start of the script in ms</li>
 <li><strong>subject:</strong> A 15-character long random subject ID for the online version, and customized subject number for the offline version)</li>
 <li><strong>session:</strong> customized session number (for offline version only))</li>
 <li><strong>internal_code_id:</strong> internal node id of the trial</li>
 <li><strong>browser_events:</strong> browser events during the task (fullscreenenter, fullscreenexit, blur or focus)</li>
 <li><strong>view_history:</strong> viewing history during the instruction trials</li>
 <li><strong>rt:</strong> the reaction time for the Go or NoGo trials in ms</li>
 <li><strong>stimulus:</strong> stimulus on the screen in HTML</li>
 <li><strong>key_press:</strong> number code of the key pressed</li>
 <li><strong>RorP:</strong> whether the stimulus presented were P or R</li>
 <li><strong>GoNoGo:</strong> whether the stimlus presented required Go or NoGo response</li>
 <li><strong>position:</strong> the position of the stimulus (1: top left, 2: top right, 3: bottom left, 4: bottom right)</li>
 <li><strong>correct_key:</strong> the key that should be pressed (32 for space, null for no keypress)</li>
 <li><strong>is_practice:</strong> whether the stimulus is presented as a practice stimulus (1 - yes, 0 - no)</li>
 <li><strong>goLetter:</strong> the letter which requires Go response in the current part of the task</li>
 <li><strong>trial_number:</strong> the trial number within the given part (1-20 for the practice trials, 1-160 for the two parts)</li>
 <li><strong>correct:</strong> whether or not correct responses were given (1 - correct, 0 - incorrect)
 </ul>

<h2>Setting options</h2>
In the <strong>parameters.js</strong> file you have the opportunity to slightly modify the task. By setting the variable <strong>numberOfRepetitions</strong>, you can modify how many times you want to include 20 trials for the task. The default is 8 (8×20 = 160).
<br>
You can also set the language of the task by modifying the varablei <strong>language</strong>. The currently available languages are enligsh (en) and hungarian (hu).

<h2>How to start the task</h2>
Open the <i>index.html</i> file in either the <i>offline</i> or <i>online</i> folder. When the offline version is started, you can customize the subject and session numbers (any number is accepted). If you start the offline version, a random subject ID will be allocated.

<h2>Browser requirements</h2>
Any browser except Safari and Internet Explorer.
