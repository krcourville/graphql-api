import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { SNSClient } from "@aws-sdk/client-sns";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { singleton } from '$app';

/**
 * Note: this class violates SOLID a bit.
 * However, tsyringe does not work with any of
 * the constructors of AWS clients, so, it is either this
 * or define custom tokens for injection all aws services
 */

@singleton()
export class AwsClients {
    public readonly sns: SNSClient;
    public readonly dynamoDocument: DynamoDBDocumentClient;

    constructor() {
        const awsClientConfig = {
            /**
             * allow local development against emulation.
             * when AWS_ENDPOINT is undefined, calls will
             * be made against the real AWS services.
             */
            endpoint: process.env.AWS_ENDPOINT,
        }

        const ddbClient = new DynamoDBClient(awsClientConfig);
        this.sns = new SNSClient(awsClientConfig);
        this.dynamoDocument = DynamoDBDocumentClient.from(ddbClient, {
            marshallOptions: {
                convertEmptyValues: true,
                removeUndefinedValues: true,
            }
        });
    }
}
