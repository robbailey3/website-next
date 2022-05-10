import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export interface PokemonPageNavProps {
  id: string;
}

const PokemonPageNav = (props: PokemonPageNavProps) => {
  const { id } = props;

  const idAsNumber = parseInt(id, 10);

  const getPrevious = () => {
    if (idAsNumber === 1) {
      return null;
    }
    return idAsNumber - 1;
  };

  const getNext = () => {
    return idAsNumber + 1;
  };

  return (
    <section>
      <div className="flex my-4">
        <div>
          {idAsNumber > 1 && (
            <Link href={`./${getPrevious()}`}>
              <a className="bg-blue-400 rounded-full px-2 py-1 block shadow text-white hover:bg-blue-500 duration-200">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="mr-4 hover:mr-2 duration-300"
                />
                <span>Previous</span>
              </a>
            </Link>
          )}
        </div>
        <div className="ml-auto">
          <Link href={`./${getNext()}`}>
            <a className="bg-blue-400 rounded-full px-2 py-1 block shadow text-white hover:bg-blue-500 duration-200">
              <span className="">Next</span>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="ml-4 hover:ml-2 duration-300"
              />
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PokemonPageNav;
