import App from "./app";
import "dotenv/config";

const devServer = process.env.SANDBOX;
//console.log(`Content of devServer: ${devServer}`, typeof devServer);
const PORT =
  devServer === "1"
    ? process.env.DEV_SERVER_PORT
    : process.env.PROD_SERVER_PORT;

new App().server.listen(PORT, () => {
  console.log(`Application is running in port: ${PORT}!`);
});
