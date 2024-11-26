import Typography from "./Typography";

interface ErrorProps {
  message: string;
}

const Error = ({ message }: ErrorProps) => {
  return (
    <div role="alert" className="min-h-screen flex items-center justify-center">
      <Typography as='p' variant='p'>
        {message}
      </Typography>
    </div>
  )
}

export default Error;