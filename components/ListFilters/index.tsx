import { FC, ChangeEvent } from 'react';
import { FaBars } from 'react-icons/fa';
import { FiltersWrapper, ButtonWrapper, SearchBox } from './ListFiltersStyles';
import Button from '../Button';

interface ListFiltersProps {
  setSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ListFilters: FC<ListFiltersProps> = ({ setSearch }) => {
  return (
    <FiltersWrapper>
      <ButtonWrapper>
        <Button lightText block>
          <FaBars />
          Sort Projects
        </Button>
      </ButtonWrapper>
      <label htmlFor='search' hidden>
        Search Projects
      </label>
      <SearchBox
        type='text'
        name='search'
        id='search'
        placeholder='Search...'
        onChange={setSearch}
      />
    </FiltersWrapper>
  );
};

export default ListFilters;
