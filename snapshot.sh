#!/usr/bin/env bash

rm tmp/door.jpg
ffmpeg -rtsp_transport tcp -i "$RTSP_CONNECTION" -f image2 -updatefirst 1 -r "1/2" tmp/door.jpg
