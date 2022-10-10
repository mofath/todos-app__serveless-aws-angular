npm run zip:signup
npm run zip:handlers
aws lambda update-function-code --function-name todoSignup --zip-file fileb://./archive-signup.zip
aws lambda update-function-code --function-name todoListTodo --zip-file fileb://./archive-handlers.zip
aws lambda update-function-code --function-name todoGetTodo --zip-file fileb://./archive-handlers.zip
aws lambda update-function-code --function-name todoAddTodo --zip-file fileb://./archive-handlers.zip
aws lambda update-function-code --function-name todoUpdateTodo --zip-file fileb://./archive-handlers.zip
aws lambda update-function-code --function-name todoDeleteTodo --zip-file fileb://./archive-handlers.zip