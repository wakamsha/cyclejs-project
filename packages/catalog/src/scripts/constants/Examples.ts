import { example as FormLabel } from '@cyclejs-project/core/renders/inputs/FormLabel';
import { example as Icon } from '@cyclejs-project/core/renders/dataDisplay/Icon';
import { example as IconButton } from '@cyclejs-project/core/renders/inputs/IconButton';
import { example as InvalidFeedback } from '@cyclejs-project/core/renders/feedback/InvalidFeedback';
import { SiAll, SoAll } from '../drivers/interface';
import { example as TextField } from '@cyclejs-project/core/renders/inputs/TextField';

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
      feedback: {
        InvalidFeedback,
      },
      input: {
        FormLabel,
        IconButton,
        TextField,
      },
    },
  },
};
