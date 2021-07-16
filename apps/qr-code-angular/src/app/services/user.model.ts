export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    firstName?: string
}

export interface Payment {
    email: string;
    name?: string;
    id?: string
}
