import { Observable } from 'rxjs';
import axios from 'axios';
import Poster from '../models/poster';
import PosterApi from '@/interfaces/api/poster.api';

export default class PosterService {
    all(): Observable<Poster[]> {
        return new Observable(subscriber => {
            axios.get('/api/posters').then(response => {
                const posters = response.data.data.map((poster: PosterApi) => new Poster().deserialize(poster));
                subscriber.next(posters);
            });
        });
    }

    get(id: number): Observable<Poster> {
        return new Observable(subscriber => {
            axios.get('/api/posters/' + id).then(response => {
                const poster = new Poster().deserialize(response.data.data);
                subscriber.next(poster);
            });
        });
    }

    insert(title: string, image: File): Observable<Poster> {
        return new Observable(subscriber => {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('image', image);

            axios.post('/api/posters', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                if (response.status === 201) {
                    const poster = new Poster().deserialize(response.data.data);
                    subscriber.next(poster);
                } else {
                    subscriber.error('Failed to insert poster. HTTP Status Code: ' + response.status);
                }
            })
        })
    }

    update(id: number, title?: string, image?: File): Observable<Poster> {
        return new Observable(subscriber => {
            const formData = new FormData();

            if (title) {
                formData.append('title', title);
            }

            if (image) {
                formData.append('image', image);
            }

            axios.post('/api/posters/' + id + '?_method=patch', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log(response.data);
                if (response.status === 200) {
                    const poster = new Poster().deserialize(response.data.data);
                    subscriber.next(poster);
                } else {
                    subscriber.error('Failed to update poster with ID "' + id + '". HTTP Status Code: ' + response.status);
                }
            })
        })
    }

    delete(poster: Poster): Observable<boolean> {
        return new Observable(subscriber => {
            axios.delete('/api/posters/' + poster.id).then(response => {
                if (response.status === 204) {
                    subscriber.next(true);
                } else {
                    subscriber.error('Failed to delete poster. HTTP Status Code: ' + response.status);
                }
            });
        });
    }
}
