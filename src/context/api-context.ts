import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DogBreedsDatasource, FriendsDatasource } from '../data';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { SNSClient } from '@aws-sdk/client-sns';

export type Datasources = {
    friends: FriendsDatasource;
    dogBreeds: DogBreedsDatasource;
}

export class ApiContext {
    public readonly datasources: Datasources;

    constructor() {
        const awsClientConfig = {
            /**
             * allow local development against emulation.
             * when AWS_ENDPOINT is undefined, calls will
             * be maded against the real AWS services.
             */
            endpoint: process.env.AWS_ENDPOINT,
        }
        const ddbClient = new DynamoDBClient(awsClientConfig);
        const snsClient = new SNSClient(awsClientConfig);

        const docClient = DynamoDBDocumentClient.from(ddbClient, {
            marshallOptions: {
                convertEmptyValues: true,
                removeUndefinedValues: true,
            }
        });

        this.datasources = {
            friends: new FriendsDatasource(docClient, snsClient),
            dogBreeds: new DogBreedsDatasource(ddbClient)
        }
    }
}
