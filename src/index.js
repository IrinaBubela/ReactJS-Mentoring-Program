import App from '../components/App';
import { getServerSideProps } from '../components/pages/index';
import 'bootstrap/dist/css/bootstrap.css'

getServerSideProps();

const Index = ({ movieList }) => {
  return <App movieList={movieList} />;
};

export default Index;

export async function getServerSideProps() {
  try {
    const API_URL = 'http://localhost:4000/movies';
      const queryParams = new URLSearchParams();
      console.log(`${API_URL}?${queryParams.toString()}`, 'hellllllllo');
      
      const response = await fetch(`${API_URL}?${queryParams.toString()}`);
      const data = await response.json();
      const movieList = data.data;
      return {
          props: { movieList }
      };
  } catch (error) {
      console.error('Error fetching movies:', error);
      return {
          props: { movieList: [] }
      };
  }
}

app.use(express.static(__dirname)); //here is important thing - no static directory, because all static :)

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});