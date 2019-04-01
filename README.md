# Application Documentation - User

## User App

REST API built with Express & Sequelize

### Basic Routes

| Route | HTTP  | Header(s) | Body | Description                 | Output |
| ----- | ----- | --------- | ---- | --------------------------- | ------ |
| `/`   | `GET` | none      | none | App's top-most route (home) |        |

### User Routes

| Route            | HTTP     | Header(s) | Body                                                                                                                                                                       | Description                                                                                   | Output                                   |
| ---------------- | -------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `/api/signup`    | `POST`   | none      | username:String (**required**), password:String (**required**), email:String (**required**), role:String (**required**)                                                    | Create new account                                                                            | created user object                      |
| `/api/signin`    | `POST`   | none      | username:String (**required**), password:String (**required**)                                                                                                             | Signing in using username & password                                                          | JWT token                                |
| `/api/users`     | `GET`    | token     | none                                                                                                                                                                       | Get all users info (ADMIN ONLY)                                                               | array of User objects                    |
| `/api/users/:id` | `GET`    | token     | none                                                                                                                                                                       | Get single user info (ADMIN & authenticated user)                                             | User object                              |
| `/api/users`     | `POST`   | token     | username:String (**required**), password:String (**required**), role:String (**required**)                                                                                 | Create a user (ADMIN ONLY)                                                                    | User object that has been inserted in DB |
| `/api/users/:id` | `DELETE` | token     | none                                                                                                                                                                       | Delete a user (ADMIN ONLY)                                                                    | ID of the deleted user                   |
| `/api/users/:id` | `PUT`    | token     | username:String (**required**), password:String (**required**), name:String (**required**), email:String (**required**)                                                    | Update a user. All attributes **must** be provided. (`role` update is allowed for Admin only) | ID of the updated user                   |
| `/api/users/:id` | `PATCH`  | token     | any one of following attributes: <ul><li>username:String</li><li>password:String</li><li>name:String</li><li>email:String</li><li>role:String --> only for Admin</li></ul> | Update a user's specific attribute (`role` update is allowed for Admin only)                  |                                          | ID of the updated user |

To run the program, run the following commands:

```bash
$ npm install
$ npm start
```

Access the API via `https://strawberry-sundae-70043.herokuapp.com/api/users`
