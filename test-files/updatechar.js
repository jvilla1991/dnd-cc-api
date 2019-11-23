let aws = require('aws-sdk');

aws.config.update({ region: 'us-east-1' });

let dynamo = new aws.DynamoDB({apiVersion: '2012-08-10'});

let params = {
    TableName: 'test-table',
    Item: {
        'value': {S: 'zyxnrid'}
    }
}

dynamo.putItem(params, (e, d) => {
    if (e) {
        console.log('error');
        throw e;
    }
    
    console.log(d);
});

