# cypress

Good info:
https://www.youtube.com/watch?v=QFCHSEHgqFE
https://learn.cypress.io/tutorials/writing-end-to-end-tests-with-cypress
the jekyl site is what i should really be testing. and components.

testing production-great idea, testing dev-too complex Acceptance testing-including deployment, config. fake any external.
'contract tests'
systems.
red green
anti-flakey
runs on e2e build
mock prod interfaces.
cypress - fun! e2e, integration, unit (on components)

my goals:
automate time wasting complex state tests.
assurance of produciton build functionality, perf.

when basic timer
click play
shows player
player countdown clock ticks from 20 to 0 every second +/- 5ms.
when player done
plays sound
announces tts.
click rerun...
play
pause
play again...
schedule
video
playlist
link

combiniations of above.

OK - how to do:
give components classNames / data-. i like data-componentname : leaves classes for css.

<div data-schedule />  get('[data-schedule])

want to easily run for different site instances: localhost 3000/4000, https://ticaboo.github.io (stage), prod: timermachine.com.
=\

dive in learn, will mess it up. keep it simple.
use actions to reduce boilerplate.
