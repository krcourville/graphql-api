import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { singleton } from '$app';
import { FollowConnection, FollowInput, FollowResult } from "../types";
import { EntityType, composeKey, extractId } from './data-types';
import { AwsClients } from 'src/context/aws-clients';

function getCursor(id: string) {
    return Buffer.from(id).toString('base64');
}

@singleton()
export class PersonDatasource {

    private readonly tableName = process.env.FRIENDS_DS__TABLE_NAME!;

    constructor(
        private readonly aws: AwsClients,
    ) { }

    public async upsertFollowEdge(input: FollowInput): Promise<FollowResult> {
        const item = {
            pk: composeKey(EntityType.PERSON, input.personId),
            sk: composeKey(EntityType.FOLLOW, EntityType.VET, input.vet.vetId),
            name: input.vet.name,
            location: input.vet.location,
            established: new Date().toISOString(),
        };
        await this.aws.dynamoDocument.send(new PutCommand({
            TableName: this.tableName,
            Item: item
        }));

        return {
            success: true
        };
    }

    public async getFollowedVetsForPerson(personId: string): Promise<FollowConnection> {
        const dbResponse = await this.aws.dynamoDocument.send(new QueryCommand({
            TableName: this.tableName,
            KeyConditionExpression: "pk = :pk",
            ExpressionAttributeValues: {
                ":pk": composeKey(EntityType.PERSON, personId)
            }
        }));

        const items = dbResponse.Items ?? [];
        const edges = items.map(item => {
            return {
                established: item.established,
                cursor: getCursor(item.sk),
                node: {
                    id: extractId(item.sk)
                }
            }
        });

        return {
            pageInfo: {
                hasNextPage: false,
                // TODO: should endCursor be required?
                endCursor: edges.at(-1)?.cursor ?? '!!'
            },
            edges,
        }
    }


    // public async add(input: PersonInput): Promise<PersonModel> {
    //     const item = {
    //         pk: uuidv4(),
    //         sk: EntityType.PERSON,
    //         name: input.name,
    //     };

    //     await this.aws.dynamoDocument.send(new PutCommand({
    //         TableName: this.tableName,
    //         Item: item
    //     }));

    //     await this.aws.sns.send(new PublishCommand({
    //         TopicArn: process.env.FRIENDS_DS__TOPIC_ARN!,
    //         Subject: "FriendCreated",
    //         Message: JSON.stringify(item),
    //     }));


    //     return {
    //         id: item.pk,
    //         name: input.name,
    //     };
    // }
    // public async getById(id: string): Promise<PersonModel> {
    //     const res = await this.aws.dynamoDocument.send(new GetCommand({
    //         TableName: this.tableName,
    //         Key: {
    //             pk: id,
    //             sk: EntityType.PERSON
    //         }
    //     }));
    //     const item = res.Item;
    //     if (item == null) {
    //         throw new Error("Friend not found");
    //     }
    //     return {
    //         id: item.pk,
    //         name: item.name,
    //     };
    // }

    // public async getAll(): Promise<PersonModel[]> {
    //     // TODO: paging
    //     const res = await this.aws.dynamoDocument.send(new QueryCommand({
    //         TableName: this.tableName,
    //         IndexName: "index-sk",
    //         KeyConditionExpression: "sk = :sk",
    //         ExpressionAttributeValues: {
    //             ":sk": EntityType.PERSON,
    //         }
    //     }));
    //     const items = res.Items ?? [];
    //     // TODO: where should this common mapping logic be handled?
    //     return items.map(item => ({
    //         id: item.pk,
    //         name: item.name,
    //         dogBreedId: item.dogBreedId,
    //     }));
    // }
}
