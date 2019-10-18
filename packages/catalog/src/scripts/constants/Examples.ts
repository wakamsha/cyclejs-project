import { example as Button } from '@cyclejs-project/core/renders/inputs/Button';
import { example as Card } from '@cyclejs-project/core/renders/surfaces/Card';
import { example as Checkbox } from '@cyclejs-project/core/renders/inputs/Checkbox';
import { example as FormLabel } from '@cyclejs-project/core/renders/inputs/FormLabel';
import { example as Icon } from '@cyclejs-project/core/renders/dataDisplay/Icon';
import { example as IconButton } from '@cyclejs-project/core/renders/inputs/IconButton';
import { example as InvalidFeedback } from '@cyclejs-project/core/renders/feedback/InvalidFeedback';
import { example as Label } from '@cyclejs-project/core/renders/dataDisplay/Label';
import { example as Radio } from '@cyclejs-project/core/renders/inputs/Radio';
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
        Label,
      },
      feedback: {
        InvalidFeedback,
      },
      input: {
        Button,
        Checkbox,
        FormLabel,
        IconButton,
        Radio,
        TextField,
      },
      surfaces: {
        Card,
      },
    },
  },
};
