const AWS = require("aws-sdk");
const { validateUser } = require("../utils/validators");

const USER_POOL_ID = "us-east-1_R5PEzgxk3";
const CLIENT_ID = "34kb3out1bnmi9pikofrfhfa3";

module.exports.handler = async (event, context, callback) => {
  try {
    const { username, password } = event;

    // Validate user
    if (!validateUser(username, password)) {
      return callback(null, {
        statusCode: 500,
        msg: "Failed to signup",
      });
    }

    // setup user pool
    const userPool = new AWS.CognitoIdentityServiceProvider({
      UserPoolId: USER_POOL_ID,
      ClientId: CLIENT_ID,
    });

    // create user
    const createUserParams = {
      UserPoolId: USER_POOL_ID,
      Username: username,
      TemporaryPassword: "12345678",
      MessageAction: "SUPPRESS",
    };
    const { User } = await userPool.adminCreateUser(createUserParams).promise();
    console.log("User created", User.Username);

    // confirm reset password
    if (User) {
      const setPasswordParams = {
        UserPoolId: USER_POOL_ID,
        Username: username,
        Password: password,
        Permanent: true,
      };

      await userPool.adminSetUserPassword(setPasswordParams).promise();
    }

    return callback(null, {
      statusCode: 201,
      msg: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    const message = error.message ? error.message : "Internal server error";
    return callback(null, {
      statusCode: 500,
      msg: message,
    });
  }
};
