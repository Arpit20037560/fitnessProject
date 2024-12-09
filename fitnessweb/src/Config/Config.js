const config = {
    development: {
      apiUrl: "http://localhost:3000",
    },
    production: {
      apiUrl: "https://fitnessproject-b8ckarguh0hvehg4.uksouth-01.azurewebsites.net",
    },
  };
  
  const currentEnv = process.env.REACT_APP_ENV || "development";
  
  export default config[currentEnv];
  