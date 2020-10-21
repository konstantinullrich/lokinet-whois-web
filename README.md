# Loki Whois

A fancy interface to request whois information about .loki-addresses using [loki-whois](https://github.com/majestrate/loki-whois)
as custom whois server.

## Deployment
To deploy the Loki Whois Web App compile the frontend
```commandline
cd frontend/
npm run build
cd ..
gradlew war
```

Finally, run the following command to bundle the backend into an executable jar.
```commandline
gradlew shadowjar
```

Copy the following files onto your server `build/lib/whoisloki-<version>-all.jar`, `build/lib/whoisloki-<version>.war`
and an adjusted `example/whois-web.conf`.

To start the server run 
```commandline
java -jar whoisloki-<version>-all.jar whois-web.conf
```