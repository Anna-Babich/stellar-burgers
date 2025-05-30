import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

import { RootState, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams();
  const allIngredient = useSelector(
    (state: RootState) => state.ingredients.data
  );
  const ingredientData = allIngredient.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
