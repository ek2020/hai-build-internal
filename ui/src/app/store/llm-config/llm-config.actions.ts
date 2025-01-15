import { LLMConfigModel } from "../..//model/interfaces/ILLMConfig";

export class SetLLMConfig {
    static readonly type = '[LLMConfig] Set';
    constructor(public payload: LLMConfigModel) { }
}
