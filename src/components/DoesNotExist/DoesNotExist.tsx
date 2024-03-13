"use client"
import React from 'react';

interface Props {
    title: string;
}

const DoesNotExist: React.FC<Props> = ({ title }) => {
    return (
        <div
            className="p-20 text-center bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800"
        >
            <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
                {`Não há ${title} que correspondam à sua busca!`}
            </h3>
        </div>
    )
};

export default DoesNotExist;