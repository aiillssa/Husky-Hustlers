import { memo, SVGProps } from 'react';

const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 18 12' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M-2.38419e-07 12V10H18V12H-2.38419e-07ZM-2.38419e-07 7V5H18V7H-2.38419e-07ZM-2.38419e-07 2V0H18V2H-2.38419e-07Z'
      fill='#1D1B20'
    />
  </svg>
);

const Memo = memo(MenuIcon);
export { Memo as MenuIcon };
