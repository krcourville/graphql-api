import { v4 as uuidv4 } from 'uuid';
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { FriendInput } from "../types";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';

export type Friend = {
    id: string;
    name: string;
}

const ddbClient = new DynamoDBClient({
    endpoint: process.env.FRIENDS_DS__ENDPOINT,
});

const docClient = DynamoDBDocumentClient.from(ddbClient, {
    marshallOptions: {
        convertEmptyValues: true,
        removeUndefinedValues: true,
    }
});

const snsClient = new SNSClient({
    endpoint: process.env.FRIENDS_DS__ENDPOINT,
});


const DELIM = "#";

const FRIEND = 'F'

export class FriendsDatasource {
    private readonly tableName = process.env.FRIENDS_DS__TABLE_NAME!;

    constructor() {
    }

    public async addFriend(input: FriendInput): Promise<Friend> {
        const item = {
            pk: uuidv4(),
            sk: FRIEND,
            name: input.name,
        };

        await docClient.send(new PutCommand({
            TableName: this.tableName,
            Item: item
        }));

        await snsClient.send(new PublishCommand({
            TopicArn: process.env.FRIENDS_DS__TOPIC_ARN!,
            Subject: "FriendCreated",
            Message: JSON.stringify(item),
        }));


        return {
            id: item.pk,
            name: item.sk,
        };
    }
    public async getFriend(id: string): Promise<Friend[]> {
        const res = await docClient.send(new GetCommand({
            TableName: this.tableName,
            Key: {
                pk: id,
                sk: FRIEND
            }
        }));
        const item = res.Item;
        if (item == null) {
            throw new Error("Friend not found");
        }
        return [{
            id: item.pk,
            name: item.name,
        }];
    }

}
