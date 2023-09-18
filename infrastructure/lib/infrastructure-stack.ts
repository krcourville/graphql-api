import * as cdk from 'aws-cdk-lib';
import * as dynamo from 'aws-cdk-lib/aws-dynamodb';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import { Construct } from 'constructs';
import * as event_source from 'aws-cdk-lib/aws-lambda-event-sources';

export class InfrastructureStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // dynamodb table
        const friendsTable = new dynamo.Table(this, 'table', {
            tableName: 'friends',
            partitionKey: {
                name: 'pk',
                type: dynamo.AttributeType.STRING
            },
            sortKey: {
                name: 'sk',
                type: dynamo.AttributeType.STRING
            },
            billingMode: dynamo.BillingMode.PAY_PER_REQUEST,
        });
        friendsTable.addGlobalSecondaryIndex({
            indexName: "index-sk",
            partitionKey: {
                name: 'sk',
                type: dynamo.AttributeType.STRING
            },
        });

        // sns topic
        const topic = new sns.Topic(this, 'topic', {
            topicName: 'friends-topic',
        });

        // sqs queue subscribe to topic
        const queue = new sqs.Queue(this, 'queue', {
            queueName: 'friends-queue',
        });
        topic.addSubscription(new subscriptions.SqsSubscription(queue, {
            rawMessageDelivery: true
        }));

        // lambda handler
        const role = new iam.Role(this, 'lambda-role', {
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            roleName: `add-friend-handler`,
            managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')]
        });

        const addFriendHandler = new lambda.Function(this, 'add-friend-handler', {
            code: lambda.Code.fromAsset('./dist/src/event-receivers/add-friend'),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_18_X,
            functionName: 'add-friend-handler',
            timeout: cdk.Duration.seconds(10),
            role
        });
        addFriendHandler.addEventSource(new event_source.SqsEventSource(queue));

    }
}
