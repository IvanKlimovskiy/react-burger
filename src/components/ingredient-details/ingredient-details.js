import styles from "./ingredient-details.module.css";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../services/slices/ingredient-details";
import {useNavigate} from "react-router-dom";

const IngredientDetails = () => {
  const {
    image,
    name,
    proteins,
    calories,
    fat,
    carbohydrates
  } = useSelector(store => store.ingredientDetails.currentIngredient);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseIngredientDetails = () => {
    navigate('/');
    dispatch(remove());
  }

  return (
    <>
      <button
        onClick={ handleCloseIngredientDetails }
        aria-label="Закрыть"
        type="button"
        className={styles.closeButton}
      ></button>
      <div className={styles.titleWrapper}>
        <h3 className={`${styles.title} text text_type_main-large`}>
          Детали ингредиента
        </h3>
      </div>
      <img
        className={styles.image}
        src={ image }
        alt={ name }
      />
      <h4 className={`${styles.name} text text_type_main-medium`}>
        { name }
      </h4>
      <div className={styles.pfcWrapper}>
        <div>
          <h5 className={`text text_type_main-default text_color_inactive`}>
            Калории,ккал
          </h5>
          <p
            className={"text text_type_digits-default text_color_inactive mt-2"}
          >
            { calories }
          </p>
        </div>
        <div>
          <h5 className={`text text_type_main-default text_color_inactive`}>
            Белки, г
          </h5>
          <p
            className={"text text_type_digits-default text_color_inactive mt-2"}
          >
            { proteins }
          </p>
        </div>
        <div>
          <h5 className={`text text_type_main-default text_color_inactive`}>
            Жиры, г
          </h5>
          <p
            className={"text text_type_digits-default text_color_inactive mt-2"}
          >
            { fat }
          </p>
        </div>
        <div>
          <h5 className={`text text_type_main-default text_color_inactive`}>
            Углеводы, г
          </h5>
          <p
            className={"text text_type_digits-default text_color_inactive mt-2"}
          >
            { carbohydrates }
          </p>
        </div>
      </div>
    </>
  );
};

export default IngredientDetails;
