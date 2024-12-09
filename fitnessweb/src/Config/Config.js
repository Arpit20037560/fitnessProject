const config = {
    development: {
        apiUrl: "http://localhost:8000",
    },
    production: {
        apiUrl: "https://mern-azure-app-test.azurewebsites.net",
    },
};

const currentEnv = process.env.REACT_APP_ENV || "development";
console.log(currentEnv);

export default config[currentEnv];
