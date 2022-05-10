import Loader from '@/components/common/Loaders/Loader/Loader';
import Pagination from '@/components/common/Pagination/Pagination';
import { useRouter } from 'next/router';
import React from 'react';
import { PokemonDefinition } from '../../models/PokemonDefinition';
import pokemon from '../../services/pokemon';
import PokemonListItem from '../PokemonListItem/PokemonListItem';

const PokemonList = () => {
  const PAGE_SIZE = 50;

  const [page, setPage] = React.useState(1);

  const [pokemonList, setPokemonList] = React.useState<PokemonDefinition[]>([]);

  const [totalCount, setTotalCount] = React.useState(0);

  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  const loadSpeciesList = React.useCallback(async () => {
    setIsLoading(true);
    const response = await pokemon.getList(PAGE_SIZE, PAGE_SIZE * (page - 1));
    setTotalCount(response.count);
    setPokemonList([...response.data]);
    setIsLoading(false);
  }, [page]);

  const updatePage = (page: number) => {
    setPage(page);
  };

  React.useEffect(() => {
    if (router.query.page) {
      setPage(parseInt(router.query.page as string, 10));
    }

    loadSpeciesList();
  }, [router.query.page, loadSpeciesList]);

  return (
    <div className="flex flex-wrap">
      {}
      {isLoading ? (
        <div className="text-center w-full my-12">
          <Loader />
        </div>
      ) : (
        pokemonList &&
        pokemonList
          .sort((a, b) => a.id - b.id)
          .map((poke) => <PokemonListItem pokemon={poke} key={poke.id} />)
      )}
      <div className="w-full mt-8">
        <Pagination
          totalItems={totalCount}
          onPageChange={updatePage}
          itemsPerPage={PAGE_SIZE}
          currentPage={page}
        />
      </div>
    </div>
  );
};

export default PokemonList;
