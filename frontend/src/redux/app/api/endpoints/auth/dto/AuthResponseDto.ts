import { User } from "@/types/models/User";

export interface AuthReponseDto {
    user: User;
    accessToken: string;
}
