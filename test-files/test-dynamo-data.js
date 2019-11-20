let aws = require('aws-sdk');
let User = require('../models/User');

aws.config.update({ region: 'us-east-2' });

let dynamodb = new aws.DynamoDB({apiVersion: '2012-08-10'});

console.log(new User('mhussain', 'abcde').json());

let testUserParams = {
    TableName: 'dnd-cc-d-user',
    Item: {
        'username': {S: 'mhussain'},
        'passwordhash': {S: 'abcde'}
    }
}

let testCharacterParams = {
    TableName: 'dnd-cc-d-character',
    Item: {
        'name': {S: 'ezylrb'},
        'username': {S: 'mhussain'},
        'level': {S: '1'},
        'race': {S: 'half-elf'},
        'charclass': {S: 'warlock'},
        'exp': {S: '1'}
    }
}

/*dynamodb.putItem(testUserParams, (err, d) => {
    if (err) {
        console.log('error');
        throw err;
    }
    console.log(d);
});*/

dynamodb.putItem(testCharacterParams, (err, d) => {
    if (err) {
        console.log('error');
        throw err;
    }
    console.log(d);
});

/*dynamodb.getItem(Sparams, (err, d) => {
    if (err) {
        console.log('error');
        throw err;
    }
    console.log(d);
});*/

/*dynamodb.updateItem(Uparams, (err, d) => {
    if (err) {
        console.log('error');
        throw err;
    }
    console.log(d);
});*/

/*dynamodb.scan(SCparams, (err, d) => {
    if (err) {
        console.log('error');
        throw err;
    }
    console.log(d);
});*/


/*let params = {
    TableName: 'dnd-cc-d-character',
    FilterExpression: '#username = :u',
    ExpressionAttributeNames: {
        '#username': 'username'
    },
    ExpressionAttributeValues: {
        ':u': {S: 'mhussain'}
    }
}

dynamodb.scan(params, (e, d) => {
    if (!e) {
        console.log(d)
    } else {
        throw e;
    }
});*/
