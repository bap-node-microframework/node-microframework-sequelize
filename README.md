# node-microframework-sequelize

Sequelize wrapper plugin for bap-node-microframework.

## Installing

To install and add the dependency to the package.json, run the following command:

```
npm install bap-node-microframework-sequelize --save
```

## Configuration

To create a connection to *mysql://localhost:3306*, write the following code in app/app.ts:

```javascript
// app/app.ts
...

import { Kernel } from "./kernel";
var kernel = new Kernel();
var App = new Application(<ApplicationOptions>{
    ...
}, <KernelInterface>kernel);

...

App.registerPlugin(SequelizePlugin, { "dsn": "mysql://localhost:3306" });

...

App.start();

...
```

## Using

### Model

To create a User Sequelize model, write the following code in app/modules/user/models/user.ts:

```javascript
// app/modules/user/models/user.ts
import { Container } from 'bap-node-microframework/core';

export class UserModel {
    static define (sequelize) {
        return sequelize.define('User', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            username: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.STRING,
            firstname: Sequelize.STRING,
            lastname: Sequelize.STRING
        }, {
            tableName: 'my_user',
            underscored: true
        });
    }
}

```

### BaseController

If you want to use the BaseController abstract class:

```javascript
import { BaseControllerSequelize } from 'bap-node-microframework-sequelize';

...

class MyClass extends BaseControllerSequelize {
    ...
}
```

### ParamConverter

You can use the paramConverter decorator to get some data from the database before executing a function in a controller.

The paramConverter signature is:

```javascript
ParamConverterSequelize(aName, { 'model': modelName, 'filterBy': { fieldDB: fieldParam } })
```

where:

- aName (String): name to use when you have to access the data in the controller function (with req.params.aName, e.g. req.params.user). Example: "user"
- modelName (String): model name to use for the request. Example: "User" (create in the Model section).
- fieldDB (String): Field name in the MongoDB instance. Example: "_id".
- fieldParam (String): Field parameter to use in the router (e.g. @Get('/users/:id')). Example: "id".

If you want to use the ParamConverter:

```javascript
import { BaseControllerSequelize, ParamConverterSequelize } from 'bap-node-microframework-sequelize';

...

class UserController extends BaseControllerSequelize {
    @BaseControllerSequelize('user', { 'model': 'User', 'filterBy': { 'id': 'id' } })
    ...
}

...
```

### Example of a controller

The following code presents a complete example of a controller:

```javascript
// app/modules/user/controllers/user.ts
import { Put, WithRouter } from 'bap-node-microframework/decorators';
import { BaseControllerSequelize, ParamConverterSequelize } from 'bap-node-microframework-sequelize';
import userForm from '../../user/forms/user';

@WithRouter()
class UserController extends BaseControllerSequelize {

    @BaseControllerSequelize('user', { 'model': 'User', 'filterBy': { '_id': 'id' } })
    @Put('/users/:id', { authenticated: false })
    update(req, res) {
        super.put(req.params.user, userForm(req), req, res);
    }
}

export default UserController.router;
```
