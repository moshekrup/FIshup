import { v4 } from 'uuid';

export default class Guid {
    private str: string;

    constructor(str?: string) {
        this.str = str || v4();
    }

    toString() {
        return this.str;
    }
}