import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

import { useDispatch, useSelector, RootState } from '../../services/store';
import { constructorSlice } from '../../slices/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.burgerConstructor);
    const handleMoveDown = () => {
      dispatch(constructorSlice.actions.moveDownIngredient(index));
    };

    const handleMoveUp = () => {
      dispatch(constructorSlice.actions.moveUpIngredient(index));
    };

    const handleClose = () => {
      dispatch(constructorSlice.actions.removeIngredient(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
