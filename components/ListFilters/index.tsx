import { useState, FC, SetStateAction } from 'react';
import { FaBars } from 'react-icons/fa';
import {
  FiltersWrapper,
  ButtonWrapper,
  FilterSection,
  SectionContainer,
  SectionHeading,
  FilterFieldContainer,
  FiltersSelect,
  SearchBox,
} from './ListFiltersStyles';
import Button from '../Button';
import { Filter, SortType, Status, SortField } from '@types';
import { ChangeEventHandler } from 'react';

interface ListFiltersProps {
  search: string;
  setSearch: (value: SetStateAction<string>) => void;
  filter: Filter;
  setFilter: (value: SetStateAction<Filter>) => void;
  sort: SortType;
  setSort: (value: SetStateAction<SortType>) => void;
}

const ListFilters: FC<ListFiltersProps> = props => {
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  const { search, setSearch } = props;
  const { filter, setFilter } = props;
  const { sort, setSort } = props;

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = e => {
    setSearch(e.target.value);
  };

  const toggleFeatured: ChangeEventHandler = () => {
    setFilter(prevFilter => ({
      ...prevFilter,
      featured: !prevFilter.featured,
    }));
  };

  const changeStatus: ChangeEventHandler<HTMLSelectElement> = e => {
    const status = e.target.value || null;

    setFilter(prevFilter => ({
      ...prevFilter,
      status,
    }));
  };

  const changeField: ChangeEventHandler<HTMLSelectElement> = e => {
    const field = e.target.value || null;

    setSort(prevSort => ({
      ...prevSort,
      field,
    }));
  };

  const changeOrder: ChangeEventHandler<HTMLSelectElement> = e => {
    setSort(prevSort => ({
      ...prevSort,
      order: e.target.value as SortType['order'],
    }));
  };

  return (
    <FiltersWrapper>
      <ButtonWrapper filtersOpen={filtersOpen}>
        <Button onClick={() => setFiltersOpen(prev => !prev)} lightText block>
          <FaBars />
          Sort Projects
        </Button>
        {filtersOpen && (
          <FilterSection>
            <SectionContainer>
              <SectionHeading>Filter</SectionHeading>
              <FilterFieldContainer as='span'>
                <span>Featured Projects Only: </span>
                <input
                  type='checkbox'
                  onChange={toggleFeatured}
                  checked={filter.featured}
                />
              </FilterFieldContainer>
              <FilterFieldContainer>
                <span>Status: </span>
                <FiltersSelect
                  onChange={changeStatus}
                  value={filter.status?.toString()}
                >
                  <option value={''}>None</option>
                  {Object.values(Status).map((status, i) => (
                    <option value={status} key={i}>
                      {status}
                    </option>
                  ))}
                </FiltersSelect>
              </FilterFieldContainer>
            </SectionContainer>
            <SectionContainer>
              <SectionHeading>Sort</SectionHeading>
              <FilterFieldContainer>
                <span>Sort Field: </span>
                <FiltersSelect
                  onChange={changeField}
                  value={sort.field?.toString()}
                >
                  <option value={''}>None</option>
                  {Object.values(SortField).map((field, i) => (
                    <option value={field} key={i}>
                      {field}
                    </option>
                  ))}
                </FiltersSelect>
              </FilterFieldContainer>
              <FilterFieldContainer>
                <span>Order: </span>
                <FiltersSelect onChange={changeOrder} value={sort.order}>
                  <option value={'asc'}>Ascending</option>
                  <option value={'desc'}>Descending</option>
                </FiltersSelect>
              </FilterFieldContainer>
            </SectionContainer>
          </FilterSection>
        )}
      </ButtonWrapper>
      <label htmlFor='search' hidden>
        Search Projects
      </label>
      <SearchBox
        type='text'
        name='search'
        id='search'
        placeholder='Search...'
        value={search}
        onChange={handleSearchChange}
      />
    </FiltersWrapper>
  );
};

export default ListFilters;
