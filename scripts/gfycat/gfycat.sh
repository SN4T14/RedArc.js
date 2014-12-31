# SN4T14 2014-12-23
# WTFPL
if [[ $1 =~ ^(https?://)?giant\.gfycat\.com/.*$ ]]
then
	wget -q "$1" -P "$2"
elif [[ "$1" =~ ^(https?://)?(www\.)?gfycat\.com/.*$ ]]
then
	url=http:$(wget -q "$1" -O - | grep "mp4source" | grep -Po 'src=".*?"' | cut -d '"' -f2)
	echo $url
	wget -q "$url" -P "$2"
else
	echo "That's not a gfycat link!"
fi
