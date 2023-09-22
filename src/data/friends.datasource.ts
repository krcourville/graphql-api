import { v4 as uuidv4 } from 'uuid';
import { PutCommand, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { singleton } from '$app';
import { FriendInput } from "../types";
import { PublishCommand } from '@aws-sdk/client-sns';
import { EntityType } from './data-types';
import { AwsClients } from 'src/context/aws-clients';
import { FriendEntity } from './data-types';

@singleton()
export class FriendsDatasource {

    private readonly tableName = process.env.FRIENDS_DS__TABLE_NAME!;

    constructor(
        private readonly aws: AwsClients,
    ) { }

    public async add(input: FriendInput): Promise<FriendEntity> {
        const item = {
            pk: uuidv4(),
            sk: EntityType.FRIEND,
            name: input.name,
            dogBreedId: input.dogBreedId,
        };

        await this.aws.dynamoDocument.send(new PutCommand({
            TableName: this.tableName,
            Item: item
        }));

        await this.aws.sns.send(new PublishCommand({
            TopicArn: process.env.FRIENDS_DS__TOPIC_ARN!,
            Subject: "FriendCreated",
            Message: JSON.stringify(item),
        }));


        return {
            id: item.pk,
            name: item.sk,
            dogBreedId: item.dogBreedId,
        };
    }
    public async getById(id: string): Promise<FriendEntity> {
        const res = await this.aws.dynamoDocument.send(new GetCommand({
            TableName: this.tableName,
            Key: {
                pk: id,
                sk: EntityType.FRIEND
            }
        }));
        const item = res.Item;
        if (item == null) {
            throw new Error("Friend not found");
        }
        return {
            id: item.pk,
            name: item.name,
            dogBreedId: item.dogBreedId,
        };
    }

    public async getAll(): Promise<FriendEntity[]> {
        // TODO: paging
        const res = await this.aws.dynamoDocument.send(new QueryCommand({
            TableName: this.tableName,
            IndexName: "index-sk",
            KeyConditionExpression: "sk = :sk",
            ExpressionAttributeValues: {
                ":sk": EntityType.FRIEND,
            }
        }));
        const items = res.Items ?? [];
        // TODO: where should this common mapping logic be handled?
        return items.map(item => ({
            id: item.pk,
            name: item.name,
            dogBreedId: item.dogBreedId,
        }));
    }
}
