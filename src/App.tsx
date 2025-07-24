import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export enum SortType {
  NONE = 'NONE',
  ALPHABETIC = 'ALPHABETIC',
  LENGTH = 'LENGTH',
  REVERSE = 'REVERSE',
}

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const sortGoods = (type: SortType) => {
    let newSortType = type;
    let newIsReversed = isReversed;

    // Handle reverse toggle
    if (type === SortType.REVERSE) {
      newIsReversed = !isReversed;
      newSortType = sortType === SortType.REVERSE ? SortType.NONE : sortType;
    } else if (type === SortType.NONE) {
      newSortType = SortType.NONE;
      newIsReversed = false;
    }

    setSortType(newSortType);
    setIsReversed(newIsReversed);

    // Apply sorting
    let sortedGoods = [...goodsFromServer];

    if (newSortType === SortType.ALPHABETIC) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (newSortType === SortType.LENGTH) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (newIsReversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
  };

  const needsReset = sortType !== SortType.NONE || isReversed;

  const getButtonClass = (buttonType: SortType) => {
    const baseClasses = 'button';
    const isActive =
      (buttonType === SortType.REVERSE && isReversed) ||
      (buttonType !== SortType.REVERSE && sortType === buttonType);

    switch (buttonType) {
      case SortType.ALPHABETIC:
        return `${baseClasses} is-info${isActive ? '' : ' is-light'}`;
      case SortType.LENGTH:
        return `${baseClasses} is-success${isActive ? '' : ' is-light'}`;
      case SortType.REVERSE:
        return `${baseClasses} is-warning${isReversed ? '' : ' is-light'}`;
      default:
        return `${baseClasses} is-danger is-light`;
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={getButtonClass(SortType.ALPHABETIC)}
          onClick={() => sortGoods(SortType.ALPHABETIC)}
          data-cy="sortAlphabetically"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getButtonClass(SortType.LENGTH)}
          onClick={() => sortGoods(SortType.LENGTH)}
          data-cy="sortByLength"
        >
          Sort by length
        </button>

        <button
          type="button"
          className={getButtonClass(SortType.REVERSE)}
          onClick={() => sortGoods(SortType.REVERSE)}
          data-cy="sortReverse"
        >
          Reverse
        </button>

        {needsReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => sortGoods(SortType.NONE)}
            data-cy="resetButton"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
