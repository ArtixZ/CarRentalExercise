# Using Hotwire API to develop a webpage with React.js

demo : http://secure-stream-86184.herokuapp.com

## Packages used:
```
  react.js
  react-Redux
  react-router
  redux-thunk
  webpack
  ant.design
 
```
## Start
```
  git clone
  npm install
  npm start
  
  the webpage will be opened by default at localhost:3000
```

To check front end code and start front end server:
```
  cd client
  git pull
  npm install
  npm start
  
  the webpage will be opened by default at localhost:3001
```
### Web
  Web is developed with React tech stack and all the packages listed above.

### Backend
  There is CORS problem with the API. So I wrote a brief backend service to fetch and prehandle the data. And then send back to front end.

### Integration
  Front end is built into bundle files. Those bundle files are hosted by backend node server, making backend and frontend running on the same domain.
  
  
