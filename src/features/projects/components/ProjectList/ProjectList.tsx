import projects from '../../data/projects';
import ProjectListItem from '../ProjectListItem/ProjectListItem';

const ProjectList = () => {
  return (
    <section className="py-12">
      <h1 className="w-full text-4xl font-bold mb-4">Projects</h1>
      <div className="flex flex-wrap space-x-4 space-y-4">
        {projects.map((project) => (
          <ProjectListItem project={project} key={project.id}></ProjectListItem>
        ))}
      </div>
    </section>
  );
};

export default ProjectList;
