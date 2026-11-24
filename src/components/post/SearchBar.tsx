import type { ChangeEvent } from 'react';
import searchIcon from '../../assets/icons/search.svg';
import * as S from './SearchBar.styles';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <S.Form role="search" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search" className="sr-only">
        제목으로 검색
      </label>
      <S.Icon src={searchIcon} alt="" />
      <S.Input
        id="search"
        type="search"
        placeholder="제목으로 검색해 보세요"
        autoComplete="off"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      />
    </S.Form>
  );
}
