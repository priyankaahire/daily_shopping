#!/bin/bash
echo GENERATING ANDROID BUILD
ionic cordova build android --prod --verbose && echo GENERATING RELEASE APK && cd platforms/android && gradlew assembleRelease && cd .. && cd ..