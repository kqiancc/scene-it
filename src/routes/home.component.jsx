import SearchBar from "../components/search-bar.component";

const Home = ({ user }) => {
  return (
    <div className='flex flex-col items-center'>
      <SearchBar />
    </div>
  );
};

export default Home;
