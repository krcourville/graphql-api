export type Friend = {
    id: string;
    name: string;
}

export class FriendsDatasource {
    public async getFriends(): Promise<Friend[]> {
        return [
            {
                id: '1',
                name: 'John Doe'
            },
            {
                id: '2',
                name: 'Jane Doe'
            }
        ];
    }

}
