export default interface Deserializable {
    /**
     * Deserializes the given input data.
     * @param input
     */
    deserialize(input: any): this;
}
