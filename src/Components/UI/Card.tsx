import { Link } from "react-router-dom";

interface CardProps {
  name: string;
  emoji: string;
  capital: string;
  continent: string;
  code: string;
}

const Card = ({ name, emoji, capital, continent, code }: CardProps) => {
  return (
    <section className="border-2 border-gray-600 rounded-md w-full h-full p-4 cursor-pointer mt-10">
      <div className="flex flex-row gap-4 border-b-2 p-2">
        <span aria-hidden="true" className="text-3xl">{emoji}</span>
        <h2 className="text-3xl">{name}</h2>
      </div>
      <div className="px-2 mt-5">
        <p className="text-xl"><strong>Capital:</strong> {capital ? capital : 'N/A'}</p>
        <p className="text-xl"><strong>Continent:</strong> {continent}</p>
        <Link to={`/details/${code}`}>Read more</Link>
      </div>
    </section>
  )
}

export default Card