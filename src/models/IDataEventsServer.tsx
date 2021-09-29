import { IDataEvents } from "./IDataEvents";

export interface IDataEventsServer {
    data: {
        count: number;
        next: string | null;
        results: Array<IDataEvents> | null;
    }
}
