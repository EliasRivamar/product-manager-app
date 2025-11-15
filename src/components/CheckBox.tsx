export function Checkbox({ value, onChange, checked }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; checked: boolean}) {
  return (
    <input
      type="checkbox"
      onChange={onChange}
      value={value}
      checked={checked}
      className='custom-checkbox h-[17px] w-[17px] text-primary rounded-full'
    />
  );
};
