# EP21104.github.io

"npm install"を実行することで"node_modules"がインストールされる？



heroku login

git clone https://github.com/ep21104/ep21104.github.io.git
cd ep21104.github.io

heroku create

git add .
git commit -m "Prepare for Heroku deployment"

git push heroku main
(heroku restart)
(heroku logs --tail)

heroku open
