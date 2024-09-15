import React from 'react';
import type { SVGProps } from 'react';

export function CallOfDutyIcon(props: SVGProps<SVGSVGElement>) {
    const { width = '1em', height = '1em', fill = 'currentColor', ...restProps } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 48 48"
            fill={fill}
            {...restProps}
        >
            <path
                fill="none"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.35 37.194c11.767 7.215 23.533 6.951 35.3 0l-7.602-4.554c-6.37 3.9-12.97 4.212-20.096 0Zm0-13.092v-7.685l17.555-10.91L41.65 16.512v7.59l-17.745-10.53Z"
            ></path>
            <path
                fill="none"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.35 37.194v-6.546l17.555-10.364L41.65 30.648v6.546L23.905 26.485Z"
            ></path>
        </svg>
    );
}
