import {
  MantineTheme,
  ScrollArea,
  SegmentedControl,
  SegmentedControlItem,
  createStyles,
} from '@mantine/core';
import { PrimarySelect } from '../inputs/PrimarySelect';
import { dispatch, useAppSelector } from '../../store/configureStore';
import { useEffectOnce } from 'react-use';
import { getAllGames } from '../../services/dataServices/gameServices';
import { responseWrapper } from '../../services/helpers/responseWrapper';
import { GameGetDto } from '../../types/games';
import { shallowEqual } from 'react-redux';
import { useNavbarHeight } from '../../hooks/useNavbarHeight';
import { CategoryAndOptions } from './CategoryAndOptions';
import { CategoryLabel } from '../../enums/categoryLabel';
import { useEffect } from 'react';
import { getAllCardTypes } from '../../services/dataServices/cardTypeServices';
import { getAllAttributes } from '../../services/dataServices/attributeServices';
import { getAllRarities } from '../../services/dataServices/rarityServices';
import { getAllSets } from '../../services/dataServices/setServices';
import { Category } from '../../types/category';
import { AppliedFilters } from '../../types/applied-filters';
import { FilterActions } from '../../types/filter-actions';

import {
  CardDispatchMode,
  setCardDispatchAction,
  setInventoryCurrentPage,
  setInventorySearchText,
} from '../../store/inventorySlice';
import { defaultGap, defaultPadding } from '../../constants/theme';

type FilterMenuProps = {
  selectedGame: GameGetDto | null;
  setSelectedGame?: (arg: GameGetDto | null) => void;
  filters: AppliedFilters;
  actions: FilterActions;
};

export function FilterMenu({
  selectedGame,
  setSelectedGame,
  filters: { cardTypeFilters, rarityFilters, setFilters },
  ...props
}: FilterMenuProps): React.ReactElement {
  const { classes } = useStyles();

  const [games, cardTypes, sets, rarities, inventoryLoading] = useAppSelector(
    (state) => [
      state.data.games,
      state.data.cardTypes,
      state.data.sets,
      state.data.rarities,
      state.inventory.loading,
    ],
    shallowEqual
  );

  const categories: Category[] = [
    {
      label: CategoryLabel.CardTypes,
      data: cardTypes,
      appliedFilters: cardTypeFilters,
    },
    {
      label: CategoryLabel.Sets,
      data: sets,
      appliedFilters: setFilters,
    },
    {
      label: CategoryLabel.Rarities,
      data: rarities,
      appliedFilters: rarityFilters,
    },
  ];

  const inventoryOptions: SegmentedControlItem[] = [
    {
      label: 'Inventory',
      value: CardDispatchMode.inventory,
    },
    {
      label: 'All',
      value: CardDispatchMode.all,
    },
  ];

  const handleInventoryChange = async (value: CardDispatchMode) => {
    dispatch(setCardDispatchAction(value));
    dispatch(setInventoryCurrentPage(1));
    dispatch(setInventorySearchText(''));
  };

  const handleGameChange = (
    value: string | React.ChangeEvent<HTMLInputElement> | null
  ) => {
    if (!setSelectedGame) return;

    const foundGame = games.find((game) => game.name === value) ?? null;
    setSelectedGame(foundGame);
  };

  /**
   * this needs to be updated to only get the data relating to the
   * game selected since not all card types belong to certain games
   */
  useEffect(() => {
    if (!selectedGame) return;

    dispatch(getAllCardTypes()).then(({ payload }) => responseWrapper(payload));
    dispatch(getAllSets()).then(({ payload }) => responseWrapper(payload));
    dispatch(getAllRarities()).then(({ payload }) => responseWrapper(payload));
    dispatch(getAllAttributes()).then(({ payload }) =>
      responseWrapper(payload)
    );
  }, [selectedGame]);

  /**
   * if games are not loaded, get all games; otherwise, return
   * to reduce api calls.
   *
   * we dont need any of the other data since a game is not selected yet
   */
  useEffectOnce(() => {
    if (games.length !== 0) return;

    dispatch(getAllGames()).then(({ payload }) => responseWrapper(payload));
  });

  return (
    <div className={classes.menu}>
      <div className={classes.select}>
        <SegmentedControl
          disabled={inventoryLoading}
          data={inventoryOptions}
          onChange={handleInventoryChange}
        />
      </div>

      <div className={classes.select}>
        <PrimarySelect
          clearable
          searchable
          withinPortal
          disabled={!setSelectedGame}
          label="Select Game:"
          value={selectedGame ? selectedGame.name : ''}
          data={games.map((game) => game.name)}
          onChange={handleGameChange}
        />
      </div>

      <div className={classes.container}>
        <ScrollArea>
          {categories.map((category, index) => (
            <CategoryAndOptions
              key={index}
              selectedGame={selectedGame}
              label={category.label}
              data={category.data}
              appliedFilters={category.appliedFilters}
              {...props}
            />
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}

const useStyles = createStyles((theme: MantineTheme) => {
  const { remainingHeight } = useNavbarHeight();

  return {
    menu: {
      display: 'grid',
      height: remainingHeight,
      alignContent: 'flex-start',

      borderRightWidth: 2,
      borderRightStyle: 'solid',
      borderRightColor: theme.colors.primaryPurpleColor[0],

      paddingTop: defaultPadding,

      gap: defaultGap,
    },

    select: {
      display: 'flex',
      justifyContent: 'center',
    },

    container: {
      display: 'grid',
      alignContent: 'flex-start',

      height: remainingHeight,
      overflow: 'auto',
    },
  };
});
