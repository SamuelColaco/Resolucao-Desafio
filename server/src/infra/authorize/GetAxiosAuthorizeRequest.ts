
import axios from "axios";
import { IGetRequest } from "../../interfaces/IGetRequest";



export class GetAxiosAuthorizeRequest implements IGetRequest{
    async authorize(): Promise<boolean> {

        const response =  await axios.get("https://util.devi.tools/api/v2/authorize", {
            validateStatus: () => true
        })

        const { status, data } = response.data

        return status === "success" && data.authorization == true
    }
}