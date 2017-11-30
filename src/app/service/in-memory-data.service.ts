import { InMemoryDbService } from 'angular-in-memory-web-api';

export class IgnighteDB implements InMemoryDbService {
  createDb() {
    const users = [
        {
            username: 'Seung Ki Lee',
            email: 'lee@ignighte.me',
            password: 'leesword'
        },
        {
            username: 'Chris Assmusen',
            email: 'chris@ignighte.me',
            password: 'chrisword'
        },
        {
            username: 'Chi Tran',
            email: 'chi@ignighte.me',
            password: 'chisword'
        },
        {
            username: 'Rick Simon',
            email: 'rick@ignighte.me',
            password: 'ricksword'
        }
    ];

    // const playlists = [
    //     {
    //         playlistName: 'K-pop before Gangnam Style',
    //         isPrivate: false,
    //         passcode: ''
    //     },
    //     {
    //         playlistName: 'Only Vietnamese Songs I know',
    //         isPrivate: true,
    //         passcode: 'Những Trò Chơi Tuổi Thơ'
    //     }
    // ];

    return {users};
    }
}