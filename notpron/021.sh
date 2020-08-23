#!/bin/bash

convert -background none \
	'(' white.jpg -threshold 92% ')' \ 
	'(' {blue,green,orange,pink,red,yellow.jpg}.jpg -fuzz  1% -transparent white ')' \
	'(' black.jpg                                   -fuzz 10% -transparent white ')' \
	-flatten maze.png
