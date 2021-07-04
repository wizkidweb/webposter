import SettingApi from "@/interfaces/api/setting.api";
import Setting from "../models/setting";
import axios from "axios";
import { Observable } from "rxjs";

export default class SettingsService {
    all(): Observable<Setting[]> {
        return new Observable(subscriber => {
            axios.get('/api/settings').then(response => {
                const settings = response.data.data.map((setting: SettingApi) => new Setting().deserialize(setting));
                subscriber.next(settings);
            });
        });
    }

    get(key: string, def = ''): Observable<string> {
        return new Observable(subscriber => {
            axios.get('/api/settings/' + key).then(response => {
                const setting = new Setting().deserialize(response.data.data);
                subscriber.next(setting.value);
            }).catch(error => {
                if (error?.response?.status === 404) {
                    subscriber.next(def);
                } else {
                    subscriber.error('There was an error getting the setting with key "' + key + '": ' + error);
                }
            });
        });
    }

    getSetting(key: string, def = ''): Observable<Setting> {
        return new Observable(subscriber => {
            axios.get('/api/settings/' + key).then(response => {
                if (response.status === 200) {
                    const setting = new Setting().deserialize(response.data.data);
                    subscriber.next(setting);
                } else {
                    subscriber.error('There was an error getting the setting with key "' + key + '". HTTP Status Code ' + response.status);
                }
            }).catch(error => {
                subscriber.error('There was an error getting the setting with key "' + key + '": ' + error);
            });
        });
    }

    set(key: string): Observable<Setting> {
        return new Observable(subscriber => {
            axios.put('/api/settings/' + key).then(response => {
                const setting = new Setting().deserialize(response.data.data);
                subscriber.next(setting);
            });
        });
    }
}
