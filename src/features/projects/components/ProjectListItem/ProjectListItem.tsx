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
    <Card
      className="p-4 flex flex-col justify-around h-full"
      header={
        <h2 className="text-2xl mb-2">
          <Link href={`/projects/${project.slug}`}>
            <a href={`/projects/${project.slug}`}>{project.title}</a>
          </Link>
        </h2>
      }
    >
      <>
        <div>
          <p>{project.description}</p>
        </div>
        <div>
          {project.keywords && project.keywords.length && (
            <div className="flex flex-wrap mt-4" data-test="project-keywords">
              {project.keywords.map((keyword) => (
                <span key={keyword} className="mt-2 mr-2">
                  <Tag variant="primary">{keyword}</Tag>
                </span>
              ))}
            </div>
          )}
        </div>
      </>
    </Card>
  );
};

export default ProjectListItem;
