# TMS-POC-Backend
This repositry consists of the backend code which exposes REST API's for the UI team to consume them and show the data related to TMS i.e. Tower Management System.

# Pre-requists
1) Nodejs version 12.0 or above.
2) MongoDB version 4.0 or above.
Optional - Microsoft VS-code as IDE or any other familiar IDE.

# How to start the application
1) Clone the code from the repositry.
2) Open the command line and move inside the TMS-POC-Backend folder using command :-
    => cd \TMS-POC-Backend
3) Type the following command to install all the dependencies :-
    => npm install
4) After successfull installation of all dependencies, just start the application using command :-
    => npm start
5) See in the console you'll find "APP running on PORT : 3030" printed which means the application has started successfully.
6) To visit the Swagger-UI for API documentation visit URL http://localhost:3030/api-docs in a web browser.
Optional - To enable default super user creation change the environment variable IS_DEFAULT_USER_ENABLE value to "1" in .env file.