export interface IUser {
    id?: number,
    username?: string,
    password?: string,
    name?: string
}

export interface IUserUpdatePassword extends IUser {
    oldPassword?: string,
    newPassword?: string,
}

export interface ITask {
    userId?: number,
    id?: number,
    date?: string,
    note?: string,
}