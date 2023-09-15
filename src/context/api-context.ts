import { FriendsDatasource } from '../data';

export class ApiContext {
    public readonly friendsDs: FriendsDatasource;

    constructor() {
        this.friendsDs = new FriendsDatasource();
    }
}
