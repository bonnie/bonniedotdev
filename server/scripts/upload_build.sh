echo "--------------> 1/4 making tar file (without local uploads)"
cd $PYTHONPATH/app && mv static/images/uploaded /var/tmp
cd $PYTHONPATH/app && tar cvf static.tar static
cd $PYTHONPATH/app && mv /var/tmp/uploaded static/images

echo "--------------> 2/4 uploading tar file to aws"
cd $PYTHONPATH/app && scp -i ~/.ssh/bdd-aws.pem static.tar ubuntu@34.212.25.188:/home/ubuntu/bonniedotdev/server/app

echo "--------------> 3/4 removing tar file"
rm $PYTHONPATH/app/static.tar

echo "--------------> 4/4 uploading index.html"
cd $PYTHONPATH/app && scp -i ~/.ssh/bdd-aws.pem index.html ubuntu@34.212.25.188:/home/ubuntu/bonniedotdev/server/app/index.html.new


echo "\nNext step: log on to aws lightsail (bdd-ssh) and run ~/bonniedotdev/server/scripts/bdd-postupload.sh"
