# Weather-Forecast - a 24 hour coding challenge


To run: 
```
git clone https://github.com/davlug3/Weather-Forecast.git
cd Weather-Forecast
npm install
npm run dev
```




For the API keys,  create a file called auth_config.json on the root folder:

```
{
  "domain": " **** AUTH0 DOMAIN **** ",
  "clientId": "**** AUTH0 CLIENT ID ****",
  "weather": "  **** OPENWEATHERMAP.ORG API KEY ****"
}
```

To get the `domain` and `clientId` from Auth0, you need to create an Auth0 account, create an application, and obtain the keys from the Application Settings section. 
You also have to add `http://localhost:5174` in "Allowed Callback URLs", "Allowed Logout URLs", and "Allowed Web Origins".

For `weather`, you need to have an account in [openweathermap.org](https://openweathermap.org), and subscribe for the **5 Day / 3 Hour Forecast**.

