import Typography from "./Typography";

interface WeatherProps {
  temperature: number;
  conditions: string;
  icon: string;
  description: string
}

const Weather = ({ temperature, conditions, icon, description }: WeatherProps) => {
  return (
    <div className="flex flex-col justify-center items-start gap-5">
      <Typography as='p' variant='p'>
        <strong>Current temperature:</strong>{' '}
        <Typography as='span'>{temperature}</Typography>
      </Typography>
      <Typography as='p' variant='p'>
        <strong>Humidity:</strong>{' '}
        <Typography as='span'>{conditions}</Typography>
      </Typography>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} />
    </div>
  )
}

export default Weather;