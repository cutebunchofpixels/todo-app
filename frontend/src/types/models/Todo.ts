import { BaseModel } from "./BaseModel";

export interface Todo extends BaseModel {
    name: string;
    content: string;
    priority: number;
    userId: number;
    done: boolean;
}

