interface CardProps {
  name: string;
  emoji: string;
}

const Card = ({ name, emoji }: CardProps) => {
  return (
    <section className="border rounded-md">
      <div className="flex flex-row gap-4">
        <span aria-hidden="true">{emoji}</span>
        <h2>{name}</h2>
      </div>
    </section>
  )
}

export default Card