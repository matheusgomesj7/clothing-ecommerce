import DirectoryItem from '../directory-item/directory-item.component';
import { DirectoryContainer } from './directory.styles.jsx';
import categories from '../../data/categories-img';

const Directory = () => {

  return (
    <DirectoryContainer>
      {categories.map((category) => (
        <DirectoryItem
        key={category.id}
        category={category}
        />
      ))}
    </DirectoryContainer>
  )
};

export default Directory;