# SN4T14 2014-12-23
# WTFPL
if [[ $1 =~ ^(https?:\/\/)?(www\.)?makeagif\.com\/.*$ ]]
then
	link=$(wget -q "$1" -O - | grep -Po '<img.*?>' | grep cdn | cut -d '"' -f2)
else
	link=$1
fi
wget -q "$link" -P "$2"
