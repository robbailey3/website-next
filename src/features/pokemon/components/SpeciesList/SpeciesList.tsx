import Loader from '@/components/common/Loaders/Loader/Loader';
import { useRouter } from 'next/router';
import React from 'react';
import { Species } from '../../models/species';
import pokemon from '../../services/pokemon';

const SpeciesList = () => {
  const PAGE_SIZE = 25;

  const [page, setPage] = React.useState(1);

  const [speciesList, setSpeciesList] = React.useState<Species[]>([]);

  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  const loadSpeciesList = React.useCallback(async () => {
    setIsLoading(true);
    const response = await pokemon.getSpeciesList(
      PAGE_SIZE,
      PAGE_SIZE * (page - 1)
    );

    setSpeciesList(response);
    setIsLoading(false);
  }, [page]);

  React.useEffect(() => {
    if (router.query.page) {
      setPage(parseInt(router.query.page as string, 10));
    }

    loadSpeciesList();
  }, [router.query.page, loadSpeciesList]);

  return (
    <>
      {speciesList &&
        speciesList.map((species) => (
          <div key={species.id}>
            {species.name}
            <img src={species.pokedex_numbers} alt="" />
          </div>
        ))}
      {isLoading && <Loader />}
    </>
  );
};

export default SpeciesList;
