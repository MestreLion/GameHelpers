#!/bin/sh
avconv -i mus3.mp3 mus3.wav
play mus3.wav speed 8 reverse
sox mus3.wav mus3.final.wav speed 8 reverse
