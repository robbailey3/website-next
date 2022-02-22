import projects from '../../data/projects';
import ProjectListItem from '../ProjectListItem/ProjectListItem';

const ProjectList = () => {
  return (
    <section className="py-12">
      <h1 className="w-full text-4xl font-bold mb-4">Projects</h1>
      <div className="flex flex-wrap">
        {projects.map((project) => (
          <div
            key={project.id}
            className="basis-full md:basis-1/2 xl:basis-1/3"
          >
            <div className="mr-4 mt-4">
              <ProjectListItem project={project}></ProjectListItem>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectList;
