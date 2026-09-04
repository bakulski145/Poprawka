type Role = "admin" | "devops" | "developer";

export class User {
    id: number;
    name: string;
    surname: string;
    role : Role;

    constructor(id: number, name: string, surname: string, role: Role){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.role = role;
    }

}