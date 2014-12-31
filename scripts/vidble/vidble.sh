#!/bin/bash

link="$1"
destination="$2"
mkdir "$destination"
wget -nv -nc -O - "$link" | grep -e "<img src='" | grep -Eo '/[^" ]+(jpg|jpeg|JPG|GIF|gif|PNG|png)' | sed -e 's/_med//' -e 's@^@http://vidble.com@' | sed '/logo/d' | sort -u > $destination/links.txt
wget -i $destination/links.txt -P $destination
