import { Link } from 'react-router-dom';

const LogoLink = () => {
  return (
    <Link to="/">
      <img className="w-[89px]" src="/logo.svg" alt="logo" />
    </Link>
  );
};

export default LogoLink;
