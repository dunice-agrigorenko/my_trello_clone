import { Cards } from '../card/card';

export interface Lists extends Cards {
    id: number;
    title: string;
    cards: Array<Cards>;
}
