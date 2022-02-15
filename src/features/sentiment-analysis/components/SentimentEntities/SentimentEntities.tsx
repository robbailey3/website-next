import { Entity } from '../../models/analyse-response';

export interface SentimentEntitiesProps {
  entities: Entity[];
}

// TODO: Think of something to do with this
const SentimentEntities = (props: SentimentEntitiesProps) => {
  const { entities } = props;

  return (
    <>
      <div className="flex flex-wrap">
        {entities.map((entity, i) => (
          <div key={`entity_${i}`} className="basis-1/4">
            <div>{entity.name}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SentimentEntities;
