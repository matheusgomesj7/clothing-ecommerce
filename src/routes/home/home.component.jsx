import Directory from '../../components/directory/directory.component';
// import { Outlet } from 'react-router-dom';
import categories from '../../data/categories';

const Home = () => {

  return (
    <div>
      {/*<Outlet />*/}
      <Directory
        categories={categories}
      />
    </div>
  );
}

export default Home;
