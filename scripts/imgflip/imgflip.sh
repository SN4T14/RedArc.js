# SN4T14 2014-12-23
# WTFPL
if [[ $1 =~ ^(https?:\/\/)?(www\.)?imgflip\.com\/.*$ ]]
then
	link=i.imgflip.com/$(echo "$1" | cut -d '/' -f5 | cut -d '#' -f1).jpg
else
	link=$1
fi
wget -q "$link" -P "$2"
