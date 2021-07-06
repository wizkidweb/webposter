import axios from 'axios';
import { Observable } from 'rxjs';

export default class PlexService {
    constructor(private url: string, private token: string) {}

    private generateUrl(endpoint: string) {
        return 'http://' + this.url + '/' + endpoint + '?X-Plex-Token=' + this.token;
    }

    connect(): Observable<boolean> {
        return new Observable(subscriber => {
            console.log('Attempting to connect to Plex Server at ', this.generateUrl(''));
            axios.get(this.generateUrl('')).then(response => {
                console.log('Data Found', response.data);
                subscriber.next(true);
            }).catch(err => {
                subscriber.error(err);
            });
        });
    }
}
