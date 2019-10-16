import { example as Icon } from '@cyclejs-project/core/renders/Icon';
import { SiAll, SoAll } from '../drivers/interface';

type Examples = {
  [workspace: string]: {
    [category: string]: {
      [type: string]: {
        [name: string]: (so: SoAll) => SiAll;
      };
    };
  };
};

export const examples: Examples = {
  core: {
    render: {
      dataDisplay: {
        Icon,
      },
    },
  },
};
