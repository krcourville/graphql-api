import { PutCommand, QueryCommand, QueryCommandInput } from "@aws-sdk/lib-dynamodb";
import { singleton } from '$app';
import { FollowInput, FollowResult, InputMaybe, Maybe, QueryInput, VetFollowConnection, VetFollowerConnection } from "../types";
import { EntityType, composeKey, extractId } from './data-types';
import { AwsClients } from 'src/context/aws-clients';

function getCursor(id: string) {
    return Buffer.from(id).toString('base64');
}

function stringCoalesce(value: string) {
    return value.length > 0 ? value : undefined;
}

function objectCoalesce(o: Record<string, any>) {
    return Object.keys(o).length > 0 ? o : undefined;
}

@singleton()
export class FriendDatasource {


    private readonly tableName = process.env.FRIENDS_DS__TABLE_NAME!;

    constructor(
        private readonly aws: AwsClients,
    ) { }

    public async upsertFollowEdge(input: FollowInput): Promise<FollowResult> {
        const item = {
            pk: composeKey(EntityType.PERSON, input.personId),
            sk: composeKey(EntityType.FOLLOW, EntityType.VET, input.vet.vetId),
            vet: {
                // WARNING: searching is case sensitive
                name: input.vet.name.toLowerCase(),
                location: input.vet.location.toLowerCase(),
            },
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

    public async getFollowedVetsForPerson(personId: string, input: QueryInput | null = null): Promise<VetFollowConnection> {
        let filter = "";
        const values: Record<string, unknown> = {
            ":pk": composeKey(EntityType.PERSON, personId)
        };
        const names: Record<string, string> = {};

        if (input?.searchTerm != null) {
            filter = 'contains(#vet.#name, :term) OR contains(#vet.#location, :term)'
            Object.assign(values, {
                ":term": input.searchTerm.toLowerCase(),
            });
            Object.assign(names, {
                "#vet": "vet",
                "#location": "location",
                "#name": "name"
            });
        }

        const queryCommandInput: QueryCommandInput = {
            TableName: this.tableName,
            KeyConditionExpression: "pk = :pk",
            FilterExpression: stringCoalesce(filter),
            ExpressionAttributeValues: objectCoalesce(values),
            ExpressionAttributeNames: objectCoalesce(names),
        };

        console.dir(queryCommandInput);

        const dbResponse = await this.aws.dynamoDocument.send(new QueryCommand(queryCommandInput));

        const items = dbResponse.Items ?? [];
        const edges = items.map(item => {
            return {
                established: item.established,
                cursor: getCursor(item.pk),
                node: {
                    id: extractId(item.sk),
                }
            }
        });

        return {
            pageInfo: {
                hasNextPage: false,
                // TODO: should endCursor be required?
                endCursor: edges.at(-1)?.cursor ?? 'TODO'
            },
            edges,
        }
    }

    public async getFollowersForVet(vetId: string): Promise<VetFollowerConnection> {
        const dbResponse = await this.aws.dynamoDocument.send(new QueryCommand({
            TableName: this.tableName,
            IndexName: 'index-sk',
            KeyConditionExpression: "sk = :sk",
            ExpressionAttributeValues: {
                ":sk": composeKey(EntityType.FOLLOW, EntityType.VET, vetId)
            }
        }));
        const items = dbResponse.Items ?? [];
        const edges = items.map(item => {
            return {
                established: item.established,
                cursor: getCursor(item.sk),
                node: {
                    id: extractId(item.pk)
                }
            }
        });

        return {
            pageInfo: {
                hasNextPage: false,
                endCursor: edges.at(-1)?.cursor ?? 'TODO'
            },
            edges,
        };
    }
}
