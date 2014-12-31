# SN4T14 2014-12-23
# WTFPL
if [[ $1 =~ (https?:\/\/)?dl\.dropboxusercontent\.com/.* ]]
then
	link=$1
else
	link=$(wget -q "$1" -U "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27" -O - | grep -Po '<ul><li><a href=.*?download_button_link.*?>' | cut -d '>' -f3 | cut -d '"' -f2)
fi
wget -q "$link" -P "$2"
