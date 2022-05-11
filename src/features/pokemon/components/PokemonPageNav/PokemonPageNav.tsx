import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Image from 'next/image';

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
        <div className="flex justify-start items-center">
          {idAsNumber > 1 && (
            <Link href={`./${getPrevious()}`}>
              <a className="bg-blue-400 rounded-full px-2 py-1 flex text-xs md:text-base shadow text-white hover:bg-blue-500 duration-200">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="mr-4 hover:mr-2 duration-300"
                />
                <span>Previous</span>
              </a>
            </Link>
          )}
        </div>
        <div className="my-8 text-center grow">
          <Image
            src={'/pokemon_logo.svg'}
            alt="Pokemon Logo"
            width={269}
            height={99}
          />
        </div>
        <div className="flex justify-end items-center">
          <div>
            <Link href={`./${getNext()}`}>
              <a className="bg-blue-400 rounded-full px-2 py-1 text-xs md:text-base flex shadow text-white hover:bg-blue-500 duration-200">
                <span className="">Next</span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="ml-4 hover:ml-2 duration-300"
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PokemonPageNav;
