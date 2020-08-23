#!/bin/bash

convert -background none \
	'(' {blue,green,orange,pink,red,yellow}.jpg -fuzz  2% -transparent white ')' \
	'(' black.jpg                               -fuzz 35% -transparent white ')' \
	'(' white.jpg -threshold 91% -repage -36-36           -transparent black ')' \
	-flatten maze.png
