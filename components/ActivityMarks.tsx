import { TIconDs } from '@libs/client/iconDs';
import joinClass from '@libs/client/joinClass';
import Icon from './Icon';

interface IActivityMarks {
  activities: IActivityMarksComponent[];
}

interface IActivityMarksComponent {
  type: TIconDs;
  isMarked: boolean;
  value: number;
  onClickFn?: () => void;
}

export interface IActivityMarksComponentPart {
  isMarked: boolean;
  value: number;
  onClickFn?: () => void;
}

const ActivityMarksComponent = ({
  type,
  isMarked,
  value,
  onClickFn
}: IActivityMarksComponent) => {
  return (
    <div
      className={joinClass([
        'flex items-center justify-start space-x-1',
        onClickFn ? 'cursor-pointer' : ''
      ])}
      onClick={onClickFn}
    >
      <Icon
        d={type}
        size={20}
        hightColor={{
          variable: isMarked,
          highlightType: {
            false: 'empty',
            true: 'orangeHighlight'
          }
        }}
      />
      <span>{value}</span>
    </div>
  );
};

const ActivityMarks = ({ activities }: IActivityMarks) => {
  return (
    <div className="flex items-center justify-start space-x-3">
      {activities.map((activity, activityIndex) => (
        <ActivityMarksComponent key={activityIndex} {...activity} />
      ))}
    </div>
  );
};

export default ActivityMarks;
