import { SQSHandler } from "aws-lambda";


export const handler: SQSHandler = async (event) => {
    for (const record of event.Records) {
        const content = record.body;
        console.log('RECORD', JSON.stringify(content));
    }
}
