import { v4 as uuidv4 } from 'uuid';
import { singleton } from '$app';
import { PutCommand, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { DogBreedInput } from "../types";
import { EntityType } from './data-types';
import { AwsClients } from 'src/context/aws-clients';
import { UserContextProvider } from 'src/context/user-context';
import { DogBreedEntity } from './data-types';

@singleton()
export class DogBreedsDatasource {

    private readonly tableName = process.env.FRIENDS_DS__TABLE_NAME!;

    constructor(
        private readonly aws: AwsClients,
        private readonly userContextProvider: UserContextProvider,
    ) { }

    public async add(input: DogBreedInput): Promise<DogBreedEntity> {
        const user = await this.userContextProvider.get();
        const { dynamoDocument } = this.aws;
        await new Promise(resolve => setTimeout(resolve, 5000));
        const item = {
            pk: uuidv4(),
            sk: EntityType.DOG_BREED,
            name: input.name,
            knownFor: input.knownFor,
            createdBy: `${user.username}#${user.clientId}`
        };
        await dynamoDocument.send(new PutCommand({
            TableName: this.tableName,
            Item: item
        }));
        return {
            id: item.pk,
            name: item.name,
            knownFor: item.knownFor,
            createdBy: item.createdBy,
        };
    }

    public async getAll(): Promise<DogBreedEntity[]> {
        // TODO: paging
        const res = await this.aws.dynamoDocument.send(new QueryCommand({
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
            createdBy: item.createdBy,
        }));
    }

    public async getById(id: string): Promise<DogBreedEntity> {
        const res = await this.aws.dynamoDocument.send(new GetCommand({
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
            createdBy: item.createdBy,
        };

    }
}
