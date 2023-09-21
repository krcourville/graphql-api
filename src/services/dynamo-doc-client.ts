import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

/**
 * DynamoDBDocumentClient constructore is protected,
 * and, therefore cannot work with tysyringe directly
 */
export class DynamoDocClient {
    constructor(
        public readonly client: DynamoDBDocumentClient,
    ) { }
}
