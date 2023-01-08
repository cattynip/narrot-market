import { TIconDs } from '../libs/iconDs';
import Icon from './Icon';

interface IActivityMarks {
  activities: {
    type: TIconDs;
    isHighlighted: boolean;
    value: number;
  }[];
}

interface IActivityMarksComponent {
  type: TIconDs;
  isHighlighted: boolean;
  value: number;
}

const ActivityMarksComponent = ({
  type,
  isHighlighted,
  value
}: IActivityMarksComponent) => {
  return (
    <div className="flex items-center justify-start space-x-1">
      <Icon d={type} size={5} isHighlighted={isHighlighted} />
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
          isHighlighted={activity.isHighlighted}
          value={activity.value}
        />
      ))}
    </div>
  );
};

export default ActivityMarks;
