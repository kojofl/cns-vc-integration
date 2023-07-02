import { ConnectorTUIBaseConstructor } from "../ConnectorTUIBase"
import axios from "axios"

export function AddFun<TBase extends ConnectorTUIBaseConstructor>(Base: TBase) {
  return class Sync extends Base {
    public constructor(...args: any[]) {
      super(...args)
      this.choices.push({ title: "Fun", value: this.fun })
    }

    protected async fun() {
      const syncRequest = await axios.post("http://localhost:3000/test")
      console.log(await syncRequest.data)
      return
    }
  }
}
