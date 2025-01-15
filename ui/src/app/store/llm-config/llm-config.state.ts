import { State, Action, StateContext, Selector } from '@ngxs/store';
import { LLMConfigModel } from "../../model/interfaces/ILLMConfig";
import { SetLLMConfig } from './llm-config.actions';
import { DefaultLLMModel, DefaultProvider } from '../../constants/llm.models.constants';

@State<LLMConfigModel>({
  name: 'LLMConfig',
  defaults: {
    apiKey: '',
    model: DefaultLLMModel,
    provider: DefaultProvider,
    apiUrl: ''
  }
})
export class LLMConfigState {

  @Selector()
  static getConfig(state: LLMConfigModel) {
    return state;
  }

  @Action(SetLLMConfig)
  setLLMConfig({ setState }: StateContext<LLMConfigModel>, { payload }: SetLLMConfig) {
    setState({ ...payload });
  }
}
