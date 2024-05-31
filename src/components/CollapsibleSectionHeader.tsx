import * as React from 'react';

import s from './CollapsibleSectionHeader.module.scss';
import { SectionNameType } from './shared/Basic';

type Props = {
  name: string;
  type: string;
  qty?: number;
  toggle?: () => void;
  isOpen?: boolean;
};

export default function Header({ name, type, toggle, qty }: Props) {
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      e.preventDefault();
      if (e.key === 'Enter' || e.key === ' ') {
        toggle();
      }
    },
    [toggle]
  );
  return (
    <div
      className={s.header}
      onClick={toggle}
      style={{ cursor: 'pointer' }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="button"
    >
      <div>
        <SectionNameType name={name} type={type} />
      </div>

      {typeof qty === 'number' ? <span className={s.qty}>{qty}</span> : null}
    </div>
  );
}
