import SettingApi from "@/interfaces/api/setting.api";
import Deserializable from "@/interfaces/deserializable";
import moment from "moment";

export default class Setting implements Deserializable {
    key!: string;
    value!: string;
    createdAt!: moment.Moment;
    updatedAt!: moment.Moment;

    deserialize(input: SettingApi): this {
        this.key = input.key;
        this.value = input.value;
        this.createdAt = moment(input.created_at);
        this.updatedAt = moment(input.updated_at);

        return this;
    }
}
