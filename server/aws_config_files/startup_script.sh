hostnamectl set-hostname aws
sudo sed '1s/$/ aws/' -i /etc/hosts
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install -y virtualenv
sudo apt-get install -y build-essential python-dev
sudo apt-get install -y postgresql postgresql-client
sudo sudo -u postgres createuser -s ubuntu
sudo apt-get install -y postgresql-server-dev-10
sudo apt-get install -y postgresql-contrib
sudo apt-get install -y python3.8 python3.8-dev
sudo apt-get install -y python3-pip
sudo echo export VIRTUALENV_PYTHON=/usr/bin/python3.8 > /etc/profile.d/virtualenv_python.sh
