import React from 'react';
import type { SVGProps } from 'react';

export function SquashIcon(props: SVGProps<SVGSVGElement>) {
    const { width = '1em', height = '1em', fill = 'currentColor', ...restProps } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill={fill}
            {...restProps}
        >
            <path
                fill={fill}
                d="M18.5 16c1.4 0 2.5 1.1 2.5 2.5S19.9 21 18.5 21S16 19.9 16 18.5s1.1-2.5 2.5-2.5m-8-15C3 1 3 3.7 3 9.8c0 3.4 3.4 7.1 6 8.3V23h3v-4.9c2.6-1.2 6-4.9 6-8.3C18 3.6 18 1 10.5 1m4.9 3.2c.3.4.4 1 .5 1.8H15V3.8c.2.1.3.3.4.4m.6 5.6v.2h-1V7h1zM14 14h-3v-3h3zm-7 0v-3h3v3zM5 9.8V7h1v3H5zM7 7h3v3H7zm4-4c1.4 0 2.4.2 3 .3V6h-3zm-1 3H7V3.4c.6-.2 1.6-.4 3-.4zm1 4V7h3v3zM6 3.8V6h-.9c.1-.8.2-1.4.5-1.8zM5.2 11H6v1.7c-.3-.6-.6-1.1-.8-1.7M8 15h2v1.3l-.2-.1C9.2 16 8.6 15.5 8 15m3.2 1.3H11V15h2c-.6.5-1.2 1-1.8 1.3m3.8-3.6V11h.8c-.2.5-.5 1.1-.8 1.7"
            ></path>
        </svg>
    );
}
