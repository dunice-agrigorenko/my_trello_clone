import { Lists } from '../list/list';

export interface BoardsArray extends Lists {
    lists: Array<Lists>
}