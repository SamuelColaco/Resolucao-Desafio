
import axios from "axios";
import { IGetNotificationRequest } from "../../interfaces/IGetNotificationRequest";

export class GetAxiosNotificationRequest implements IGetNotificationRequest{
    async notification(): Promise<boolean> {
        const response = await axios.post("https://util.devi.tools/api/v1/notify", {
            message: "Você recebeu pagamento"
        }, {
            validateStatus: () => true
        })

        const { status } = response.data

        return status !== "error"
    }
}