Project setup steps: 
Run "npm i"
Create a .env file based on .env.example
Start MySQL and create a new database named 'test'.
Then run "npm run dev".
Use Postman to test the APIs. 
First, execute the POST method for the API 'http://127.0.0.1:8000/api/v1/users/login' to obtain a token 
{
"userName":"admin",
"email":"admin@gmail.com",
"password":"123456"
}
Then, attach this token to the header with the key 'Authorization' and proceed to test the remaining CRUD APIs.
