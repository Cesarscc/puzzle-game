import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black w-full h-32">
      <ul className="flex justify-around items-center h-full">
        <li className="text-[#e7e7e7] text-base font-semibold">
          <Link
            href={'https://portfolio-cesarscc.netlify.app/'}
            target="_blank"
            className="flex gap-x-2 items-center"
          >
            Portfolio <i>{<ExternalLinkIcon />}</i>
          </Link>
        </li>
        <li className="text-[#e7e7e7] text-base font-semibold">
          <Link
            href={'https://github.com/Cesarscc'}
            target="_blank"
            className="flex gap-x-2 items-center"
          >
            Github <i>{<ExternalLinkIcon />}</i>
          </Link>
        </li>
        <li className="text-[#e7e7e7] text-base font-semibold">
          <Link
            href={'https://www.linkedin.com/in/cesarcolorado/'}
            target="_blank"
            className="flex gap-x-2 items-center"
          >
            Linkedin <i>{<ExternalLinkIcon />}</i>
          </Link>
        </li>
      </ul>
      <div className="bg-black w-full flex justify-center">
        <p className="text-[#e7e7e7] text-base font-semibold">
          Copyright © 2025. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
