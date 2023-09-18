import { v4 as uuidv4 } from 'uuid';
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { DogBreedInput } from "../types";
import { EntityType } from './data-types';

export type DogBreedEntity = {
    id: string;
    name: string;
    knownFor: string;
}

export class DogBreedsDatasource {

    private readonly tableName = process.env.FRIENDS_DS__TABLE_NAME!;

    constructor(
        private readonly docClient: DynamoDBDocumentClient,
    ) { }

    public async add(input: DogBreedInput): Promise<DogBreedEntity> {
        const item = {
            pk: uuidv4(),
            sk: EntityType.DOG_BREED,
            name: input.name,
            knownFor: input.knownFor,
        };
        await this.docClient.send(new PutCommand({
            TableName: this.tableName,
            Item: item
        }));
        return {
            id: item.pk,
            name: item.name,
            knownFor: item.knownFor,
        };
    }

    public async getAll(): Promise<DogBreedEntity[]> {
        // TODO: paging
        const res = await this.docClient.send(new QueryCommand({
            TableName: this.tableName,
            IndexName: "index-sk",
            KeyConditionExpression: "sk = :sk",
            ExpressionAttributeValues: {
                ":sk": EntityType.DOG_BREED,
            }
        }));
        const items = res.Items ?? [];
        // TODO: where should this common mapping logic be handled?
        return items.map(item => ({
            id: item.pk,
            name: item.name,
            knownFor: item.knownFor,
        }));
    }

    public async getById(id: string): Promise<DogBreedEntity> {
        const res = await this.docClient.send(new GetCommand({
            TableName: this.tableName,
            Key: {
                pk: id,
                sk: EntityType.DOG_BREED,
            }
        }));
        const item = res.Item;
        if (item == null) {
            throw new Error("Dog breed not found");
        }
        return {
            id: item.pk,
            name: item.name,
            knownFor: item.knownFor,
        };

    }
}
