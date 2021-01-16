#!/bin/bash

set -ex

npm run cordova-prepare
cd src-cordova
set +e
rm *.apk
set -e
cordova build android --release
cp platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk Demo-release-unsigned.apk

jarsigner -verbose -keystore ../demo.keystore -signedjar Demo-unaligned.apk Demo-release-unsigned.apk demo.keystore

set +x
echo -n "Input version (major.minor.bugfix): "
read appVersion
set -x

zipalign -v 4 Demo-unaligned.apk "Demo-v${appVersion}.apk"
