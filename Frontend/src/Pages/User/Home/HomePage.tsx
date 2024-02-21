
import image1 from '../../../assets/image1.jpg'

function Home() {
  return (
    <div>
      <header>
        <h1>My Simple React Home Page</h1>
      </header>
      <main>
        <p>Welcome to my simple React home page! This is a basic example of a React project.</p>
        <br></br>
        <img src={image1} alt="Placeholder" />
      </main>
    </div>
  );
}

export default Home;
