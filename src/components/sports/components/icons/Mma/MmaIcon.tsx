import React from 'react';
import type { SVGProps } from 'react';

export function MmaIcon(props: SVGProps<SVGSVGElement>) {
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
                d="M15 10V7H7v3zm3-3c.28 0 .5.09.7.29c.19.21.3.44.3.71v2.78c0 .19-.03.33-.06.42l-.8 3.99c-.14.53-.44.81-.94.81H6.8c-.53 0-.85-.28-.94-.81l-.8-3.99c-.03-.09-.06-.23-.06-.42V5c0-.5.21-1 .6-1.39C6 3.2 6.45 3 7 3h8c.53 0 1 .2 1.41.61c.4.39.59.89.59 1.39v3c0-.27.11-.5.3-.71c.2-.2.42-.29.7-.29M7 20v-3h10v3c0 .3-.09.53-.29.72c-.21.19-.44.28-.71.28H8c-.27 0-.5-.09-.71-.28c-.2-.19-.29-.42-.29-.72"
            ></path>
        </svg>
    );
}
