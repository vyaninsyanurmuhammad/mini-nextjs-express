import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const HomeFilterInputPrice = ({
  title,
  value,
}: {
  title?: string;
  value?: number;
}) => {
  return (
    <div className="grid w-32 items-center gap-1.5">
      <Label htmlFor="minimum">{title}</Label>
      <div className="w-full flex">
        <div className="bg-slate-100 rounded-l-lg">
          <span className="h-full w-fit px-2 flex justify-center items-center text-sm font-medium">
            Rp.
          </span>
        </div>
        <Input
          className="rounded-l-none focus:!ring-offset-0 focus:!ring-0"
          type="number"
          id={(title ?? 'price').toLowerCase()}
          defaultValue={value}
          placeholder="0"
        />
      </div>
    </div>
  );
};

export default HomeFilterInputPrice;
