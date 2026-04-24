import type { ReactNode } from 'react';

interface HelpCenterSearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  placeholder?: string;
  rightSlot?: ReactNode;
  children?: ReactNode;
}

export function HelpCenterSearchField({
  value,
  onChange,
  onKeyDown,
  onFocus,
  placeholder = '请输入关键字，如：信息管理、信息源',
  rightSlot,
  children,
}: HelpCenterSearchFieldProps) {
  const inputPaddingClass = rightSlot ? 'pr-32' : 'pr-6';

  return (
    <div className="relative">
      <img
        src="/图标/搜索图标.png"
        alt="搜索"
        className="absolute left-4 top-1/2 z-10 h-6 w-6 -translate-y-1/2"
      />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        placeholder={placeholder}
        className={`w-full rounded-full border-2 border-[#FF8A00] bg-white py-4 pl-12 text-base shadow-sm transition-shadow focus:border-[#FF8A00] focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,138,0,0.1)] ${inputPaddingClass}`}
      />
      {rightSlot}
      {children}
    </div>
  );
}
