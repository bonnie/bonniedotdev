echo "--------------> 1/3 making tar file"
cd $PYTHONPATH/app && tar cvf static.tar static

echo "--------------> 2/3 uploading tar file to aws"
cd $PYTHONPATH/app && scp -i ~/.ssh/bdd-aws.pem static.tar ubuntu@34.212.25.188:/home/ubuntu/bonniedotdev/server/app

echo "--------------> 3/3 removing tar file"
rm $PYTHONPATH/app/static.tar

echo "\nNext step: log on to aws lightsail (bdd-ssh) and \`tar xvf static.tar\` in ~/bonniedotdev/server/app"
