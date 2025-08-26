import type { SVGProps } from 'react';

export default function DreamWeaverLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15.1 3.4C13.5 3.8 12 4.9 12 6.5s1.5 2.7 3.1 3.1c1.6.4 3.1-.7 3.1-2.3 0-1.6-1.5-2.7-3.1-3.1Z" />
      <path d="M21.6 15.1c.4-1.6-.7-3.1-2.3-3.1s-2.7 1.5-3.1 3.1c-.4 1.6.7 3.1 2.3 3.1s2.7-1.5 3.1-3.1Z" />
      <path d="M12 22a9.9 9.9 0 0 0 9.4-7.4" />
      <path d="M5 20.4a9.9 9.9 0 0 1-2.4-8.9" />
      <path d="M2.6 9.4A9.9 9.9 0 0 1 11.5 2" />
      <path d="m14.5 6.5-12 12" />
    </svg>
  );
}
