import { CVSkillCategory } from '@/data/cv/cv';

type CvSkillCategoryProps = {
  category: CVSkillCategory;
};

const CvSkillCategory = (props: CvSkillCategoryProps) => {
  const { category } = props;

  return (
    <>
      <h3>{category.title}</h3>
      <ul>
        {category.skills.map((skill, index) => (
          <li key={`${category.title}_${index}`}>{skill.name}</li>
        ))}
      </ul>
    </>
  );
};

export default CvSkillCategory;
