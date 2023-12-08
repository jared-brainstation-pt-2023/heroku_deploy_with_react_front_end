# Deploy React App with Node Server to Heroku

## Client Folder

1. Locally, navigate to client folder, ```cd client```
2. run ```npm i``` to install all the npm packages 
3. run ```npm build``` to create all of the static files from the react project
4. run ```rm -rf node_modules/``` to delete all of the node_modules from the client directory

## Deployment (From Main Directory)

1. Create Github repo
2. ```git init```
3. ```git remote add origin <GITHUB_REPO>```
4. ```git add .```
5. ```git commit -m 'heroku deployment'```
6. ```git push --set-upstream origin main```
7. ```heroku create```
7. ```git push heroku main```
