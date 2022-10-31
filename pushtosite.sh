#assumes single js and single css file in each source directory to be able to mv *.xx -> named.xx
#so if app gets larger/separates libs to chunkxxx.js -process will go badly wrong!
cp build/static/js/*.js   ../../timermachine.github.io/assets/js/timerapp.js
cp build/static/css/*.css ../../timermachine.github.io/assets/css/timer.css