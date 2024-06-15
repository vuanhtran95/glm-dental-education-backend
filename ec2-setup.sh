# Install NodeJS 18
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts
node -e "console.log('Running Node.js ' + process.version)"
nvm install 18

# Install git
sudo yum update -y
sudo yum install git -y
git -v
git clone https://github.com/victorvusg/glm-dental-education-backend.git
cd glm-dental-education-backend/

# Instal tools
npm install -g nodemon
npm install -g ts-node
npm install
