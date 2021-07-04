import PosterApi from "@/interfaces/api/poster.api";
import Deserializable from "@/interfaces/deserializable";
import moment from 'moment';

export default class Poster implements Deserializable {
    id!: number;
    title!: string;
    image!: string;
    createdAt!: moment.Moment;
    updatedAt!: moment.Moment;

    deserialize(input: PosterApi): this {
        this.id = input.id;
        this.title = input.title;
        this.image = input.image;
        this.createdAt = moment(input.created_at);
        this.updatedAt = moment(input.updated_at);

        return this;
    }
}
