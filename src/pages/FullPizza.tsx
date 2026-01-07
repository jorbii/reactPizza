import React from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title:string;
    price:number;
  }>();
  const {id} = useParams();

  React.useEffect(() => {
    async function fetchPizzas(){
        try {
      const {data} = await axios.get('https://68fdc9817c700772bb11ec50.mockapi.io/Items/' + id);
      setPizza(data);
      } catch (error) {
        alert('error to get pizza');
      }
    }

    fetchPizzas();
  },[id]);

  if (!pizza) {
    return <div className='container'>loading...</div>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt={pizza.title}/>
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}$</h4>
      </div>
  )
}
export default FullPizza;