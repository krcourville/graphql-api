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
        const endpoint = process.env.AWS_ENDPOINT;
        const ddbClient = new DynamoDBClient({
            endpoint,
        });

        const docClient = DynamoDBDocumentClient.from(ddbClient, {
            marshallOptions: {
                convertEmptyValues: true,
                removeUndefinedValues: true,
            }
        });

        const snsClient = new SNSClient({
            endpoint,
        });

        this.datasources = {
            friends: new FriendsDatasource(docClient, snsClient),
            dogBreeds: new DogBreedsDatasource(ddbClient)
        }
    }
}
