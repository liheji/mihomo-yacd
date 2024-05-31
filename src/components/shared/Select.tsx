import * as React from 'react';

import s from './Select.module.scss';

type Props = {
  options: Array<string[]>;
  selected: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ options, selected, onChange, ...props }: Props) {
  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select className={s.select} value={selected} onChange={onChange} {...props}>
      {options.map(([value, name]) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
}
