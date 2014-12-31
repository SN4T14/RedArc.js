# SN4T14, 2014-11-29
# Simple download tool for non-direct imgur links
destination="$1"
link="$(curl -s $2 | grep "image_src" | rev | cut -d ' ' -f 1 | rev | cut -d '"' -f 2)"
wget -nc -P "$destination" "$link"
