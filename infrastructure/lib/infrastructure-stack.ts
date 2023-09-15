import * as cdk from 'aws-cdk-lib';
import * as dynamo from 'aws-cdk-lib/aws-dynamodb';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';

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
        const topic = new sns.Topic(this, 'topic', {
            topicName: 'friends-topic',
        });

        // sqs queue subscribe to topic
        const queue = new sqs.Queue(this, 'queue', {
            queueName: 'friends-queue',
        });
        topic.addSubscription(new subscriptions.SqsSubscription(queue));

        // lambda handler
    }
}
