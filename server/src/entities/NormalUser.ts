
import { randomUUID } from "node:crypto"

type NormalUserProps =  {
    name: string
    email: string
    passwordHash: string
    CPF: string
    balance?: number
}
export class NormalUser{

    public readonly id: string

    public name: string
    public email: string
    public passwordHash: string
    public CPF: string
    public balance: number = 0

    constructor(props: NormalUserProps, id?: string){

        this.id = id ?? randomUUID()
        this.name = props.name
        this.email = props.email
        this.passwordHash = props.passwordHash
        this.CPF = props.CPF
        this.balance = props.balance ?? 0

    }


}