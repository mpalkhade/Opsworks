cd files
cp /Users/mpalkhade/Downloads/sapana_aws_new.pem sapana_aws_new.pem
chmod 755 sapana_aws_new.pem
npm install
node GigyaStack.js gigya-qa qa

sudo mv set_parameters.env /params/gigya.properties
