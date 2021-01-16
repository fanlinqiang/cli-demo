#!/bin/bash
cd src-cordova
rm demo.apk
set +x
# 即加固后的apk名
echo -n "请输入要注册的apk名称: "
read appName
set -x

jarsigner -verbose -keystore ../dpp -signedjar demo-unzipaligned.apk $appName dpp

zipalign -v 4 demo-unzipaligned.apk demo.apk
