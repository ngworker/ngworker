import { SpectacularCreatePipeOptions } from '../spectacular-create-pipe-options';
import { CreateCommonPipeArguments } from './create-common-pipe-arguments';
import { PassthroughPipe, passthroughPipeName } from './passthrough.pipe';

export function createCommonPipeOptions<TPipeValue>({
  template,
  value,
}: CreateCommonPipeArguments<TPipeValue>): SpectacularCreatePipeOptions<TPipeValue> {
  return {
    pipeName: passthroughPipeName,
    pipeType: PassthroughPipe,
    value,
    template,
  };
}
