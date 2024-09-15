import React from 'react';
import type { SVGProps } from 'react';

export function DefaultIcon(props: SVGProps<SVGSVGElement>) {
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
            <g
                fill="none"
                stroke={fill}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
            >
                <path
                    strokeDasharray="2 4"
                    strokeDashoffset={6}
                    d="M12 21c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        dur="0.6s"
                        repeatCount="indefinite"
                        values="6;0"
                    ></animate>
                </path>
                <path
                    strokeDasharray={32}
                    strokeDashoffset={32}
                    d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9"
                >
                    <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.1s"
                        dur="0.4s"
                        values="32;0"
                    ></animate>
                </path>
                <path
                    strokeDasharray={10}
                    strokeDashoffset={10}
                    d="M12 16v-7.5"
                >
                    <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.5s"
                        dur="0.2s"
                        values="10;0"
                    ></animate>
                </path>
                <path
                    strokeDasharray={6}
                    strokeDashoffset={6}
                    d="M12 8.5l3.5 3.5M12 8.5l-3.5 3.5"
                >
                    <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.7s"
                        dur="0.2s"
                        values="6;0"
                    ></animate>
                </path>
            </g>
        </svg>
    );
}
