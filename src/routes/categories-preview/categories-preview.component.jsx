import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  //*fixme: put listener here so it always map when categoriesMap changes, not just one time

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const currentProductsCategory = categoriesMap[title];
        return (
          <CategoryPreview
            key={title}
            title={title}
            products={currentProductsCategory}
          />
        )
      })
      }
    </Fragment>
  )
};

export default CategoriesPreview;