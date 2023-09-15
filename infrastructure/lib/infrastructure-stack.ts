import * as cdk from 'aws-cdk-lib';
import * as dynamo from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfrastructureStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // dynamodb table
        new dynamo.Table(this, 'table', {
            tableName: 'friends',
            partitionKey: {
                name: 'pk',
                type: dynamo.AttributeType.STRING
            },
            sortKey: {
                name: 'sk',
                type: dynamo.AttributeType.STRING
            },
            billingMode: dynamo.BillingMode.PAY_PER_REQUEST
        });

        // sns topic

        // sqs queue subscribe to topic
        // lambda handler

        // example resource
        const queue = new sqs.Queue(this, 'InfrastructureQueue', {
            visibilityTimeout: cdk.Duration.seconds(300)
        });
    }
}
