import * as vision from '@google-cloud/vision';

export interface FaceAttributeProps {
  attribute: string;
  likelihood:
    | 'UNKNOWN'
    | 'VERY_UNLIKELY'
    | 'UNLIKELY'
    | 'POSSIBLE'
    | 'LIKELY'
    | 'VERY_LIKELY';
}

const FaceAttribute = (props: FaceAttributeProps) => {
  const { attribute, likelihood } = props;

  const getLikelyHoodWidth = () => {
    switch (likelihood) {
      case 'VERY_LIKELY':
        return '100%';
      case 'LIKELY':
        return '75%';
      case 'POSSIBLE':
        return '50%';
      case 'UNLIKELY':
        return '25%';
      case 'VERY_UNLIKELY':
      case 'UNKNOWN':
        return '0%';
      default:
        return '0%';
    }
  };

  const getLikelihoodDisplayWording = () => {
    switch (likelihood) {
      case 'VERY_LIKELY':
        return 'Very Likely';
      case 'LIKELY':
        return 'Likely';
      case 'POSSIBLE':
        return 'Possible';
      case 'UNLIKELY':
        return 'Unlikely';
      case 'VERY_UNLIKELY':
        return 'Very Unlikely';
      case 'UNKNOWN':
        return 'Unknown';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="mb-1 text-slate-700 italic text-xs">
      <div className="flex items-center">
        <div className="basis-1/6 text-right px-2">{attribute}</div>
        <div className="basis-2/3 p-2">
          <div className="h-4 w-full bg-gray-50 rounded relative overflow-hidden">
            <div
              className="h-full absolute top-0 left-0 bg-blue-400"
              style={{ width: getLikelyHoodWidth() }}
            ></div>
          </div>
        </div>
        <div className="basis-1/6">{getLikelihoodDisplayWording()}</div>
      </div>
    </div>
  );
};

export default FaceAttribute;
