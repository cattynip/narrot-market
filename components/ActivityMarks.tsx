import { TIconDs } from '@libs/iconDs';
import Icon from './Icon';

interface IActivityMarks {
  activities: {
    type: TIconDs;
    isMarked: boolean;
    value: number;
  }[];
}

interface IActivityMarksComponent {
  type: TIconDs;
  isMarked: boolean;
  value: number;
}

const ActivityMarksComponent = ({
  type,
  isMarked,
  value
}: IActivityMarksComponent) => {
  return (
    <div className="flex items-center justify-start space-x-1">
      <Icon
        d={type}
        size={20}
        hightColor={{
          variable: isMarked,
          highlightType: {
            true: 'empty',
            false: 'orangeHighlight'
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
        <ActivityMarksComponent
          key={activityIndex}
          type={activity.type}
          isMarked={activity.isMarked}
          value={activity.value}
        />
      ))}
    </div>
  );
};

export default ActivityMarks;
