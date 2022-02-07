import Card from '@/components/common/Card/Card';
import Tag from '@/components/common/Tag/Tag';
import Link from 'next/link';
import { Project } from '../../models/Project';

export interface ProjectListItemProps {
  project: Project;
}

const ProjectListItem = (props: ProjectListItemProps) => {
  const { project } = props;
  return (
    <Card className="basis-full md:basis-1/2 xl:basis-1/3 p-4">
      <div>
        <h2 className="text-2xl mb-2">
          <Link href={`/projects/${project.slug}`}>
            <a href={`/projects/${project.slug}`}>{project.title}</a>
          </Link>
        </h2>
      </div>
      <div>
        <p>{project.description}</p>
        {project.keywords && project.keywords.length && (
          <div
            className="flex flex-wrap space-x-4 mt-4"
            data-test="project-keywords"
          >
            {project.keywords.map((keyword) => (
              <Tag key={keyword} variant="primary">
                {keyword}
              </Tag>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProjectListItem;
