import styles from "./ingredient-details.module.css";
import ingredientsPropTypes from "../../utils/utils";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_INGREDIENT_DETAILS } from "../../services/constants/constants";

const IngredientDetails = ({data, selectedIngredientId}) => {

  const selectedIngredient = data.find(el => {
    return el._id === selectedIngredientId
  })

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SET_INGREDIENT_DETAILS,
      ingredient: selectedIngredient
    })
  }, [])

  return (
    <>
      {!selectedIngredient ? null :
        <>
          <div className={styles.titleWrapper}>
            <h3 className={`${styles.title} text text_type_main-large`}>
              Детали ингредиента
            </h3>
          </div>
          <img
            className={styles.image}
            src={selectedIngredient.image}
            alt={selectedIngredient.name}
          />
          <h4 className={`${styles.name} text text_type_main-medium`}>
            {selectedIngredient.name}
          </h4>
          <div className={styles.pfcWrapper}>
            <div className={styles.calories}>
              <h5 className={`text text_type_main-default text_color_inactive`}>Калории,ккал</h5>
              <p className={'text text_type_digits-default text_color_inactive mt-2'}>
                {selectedIngredient.calories}
              </p>
            </div>
            <div className={styles.calories}>
              <h5 className={`text text_type_main-default text_color_inactive`}>Белки, г</h5>
              <p className={'text text_type_digits-default text_color_inactive mt-2'}>
                {selectedIngredient.proteins}
              </p>
            </div>
            <div className={styles.calories}>
              <h5 className={`text text_type_main-default text_color_inactive`}>Жиры, г</h5>
              <p className={'text text_type_digits-default text_color_inactive mt-2'}>
                {selectedIngredient.fat}
              </p>
            </div>
            <div className={styles.calories}>
              <h5 className={`text text_type_main-default text_color_inactive`}>Углеводы, г</h5>
              <p className={'text text_type_digits-default text_color_inactive mt-2'}>
                {selectedIngredient.carbohydrates}
              </p>
            </div>
          </div>
        </>
      }
    </>);
};

IngredientDetails.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientsPropTypes)).isRequired,
  selectedIngredientId: PropTypes.string.isRequired
};

export default IngredientDetails;