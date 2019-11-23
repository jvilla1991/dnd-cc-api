let aws = require('aws-sdk');

aws.config.update({ region: 'us-east-1' });

let dynamodb = new aws.DynamoDB({apiVersion: '2012-08-10'});

let Iparams = {
    TableName: 'User',
    Item: {
        'userId': {S: '002'},
        'username': {S: 'tgibson'},
        'passwordhash': {S: 'helloworld'}
    }
}

let Sparams = {
    TableName: 'User',
    Key: {
        'username': {S: 'mhussain'}
    },
    ProjectionExpression: 'username,passwordhash'
}

let Uparams = {
    TableName: 'User',
    Key: {
        'userId': {S: '002'}
    },
    UpdateExpression: 'set passwordhash = :val1',
    ExpressionAttributeValues: {
        ':val1': {S: 'pmurtdlanod'}
    }
}

let SCparams = {
    TableName: 'User'
}

let params = {
    TableName: 'dnd-cc-d-character',
    Key: {
        'name': {S: 'sykes'}
    },
    UpdateExpression: 'SET \'level\' = :l',
    ExpressionAttributeValues: {
        ':l': {S: '2'}
    }
};

/*dynamodb.getItem(p, (err, d) => {
    if (err) {
        console.log('error');
        throw err;
    }
    console.log(d);
});*/

/*dynamodb.putItem(Iparams, (err, d) => {
    if (err) {
        console.log('error');
        throw err;
    }
    console.log(d);
});*/

/*dynamodb.getItem(Sparams, (err, d) => {
    if (err) {
        console.log('error');
        throw err;
    }
    console.log(d);
});*/

dynamodb.updateItem(params, (err, d) => {
    if (err) {
        console.log('error');
        throw err;
    }
    console.log(d);
});

/*dynamodb.scan(SCparams, (err, d) => {
    if (err) {
        console.log('error');
        throw err;
    }
    console.log(d);
});*/
