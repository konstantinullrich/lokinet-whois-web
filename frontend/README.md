# Loki WhoIs Frontend

## Development
To start a development server run 
```shell script
npm start
```

> Important: If the dev-backend is running on a port other than 8080 you need to adjust the url in `src/setupProxy.js`

## Tests
To run the Jest Unit Test execute 
```shell script
npm test
```

## Release
If you want to release a new version you need to compile the react app first by running the following command in this dir.
```shell script
npm run build
```

To bundle the compiled JavaScript and other required resources into a deploy-ready .war file go to the root dir of this
project and run. The war should then be generated and stored in `build/libs`.
```shell script
./gradlew war
```  