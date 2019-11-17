let aws = require('aws-sdk');

aws.config.update({ region: 'us-east-2' });

let dynamodb = new aws.DynamoDB({apiVersion: '2012-08-10'});

let Iparams = {
    TableName: 'User',
    Item: {
        'userId': {S: '001'},
        'username': {S: 'moohh'},
        'passwordhash': {S: 'helloworld'}
    }
}

let Sparams = {
    TableName: 'User',
    Key: {
        'userId': {S: '001'}
    },
    ProjectionExpression: 'userId,username,passwordhash'
}

/*dynamodb.putItem(params, (err, d) => {
    if (err) {
        console.log('error');
        throw err;
    }
    console.log(d);
});*/

dynamodb.getItem(Sparams, (err, d) => {
    if (err) {
        console.log('error');
        throw err;
    }
    console.log(d);
});
