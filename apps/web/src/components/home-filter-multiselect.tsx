'use client';

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  Command,
} from '@/components/ui/command';
import { ChevronsUpDown, Check } from 'lucide-react';
import dynamic from 'next/dynamic';

const LocalTooltips = dynamic(() => import('@/components/local-tooltips'), {
  ssr: false,
});

const HomeFilterMultiselect = ({
  className,
  list,
  title,
}: {
  className?: string;
  list: string[];
  title: string;
}) => {
  const [listCategory, setListCategory] = useState(
    list.map((data) => {
      return { text: data, state: false };
    }),
  );

  const selectedListCategory = [
    ...listCategory
      .filter((data) => data.state === true)
      .map((data) => data.text),
  ];

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`flex flex-col gap-2 ${className}`}>
        <Label htmlFor="category">{title}</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full flex justify-between"
            >
              <LocalTooltips
                content={
                  selectedListCategory.length === 0
                    ? `Search ${title}...`
                    : selectedListCategory.join(', ')
                }
              >
                <div className="w-full flex justify-between">
                  <span className="w-full text-start overflow-hidden truncate">
                    {selectedListCategory.length === 0
                      ? `Search ${title}...`
                      : selectedListCategory.join(', ')}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </div>
              </LocalTooltips>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[270px] p-0">
            <Command>
              <CommandInput placeholder={`Search ${title}...`} />
              <CommandList>
                <CommandEmpty>No Category found.</CommandEmpty>
                <CommandGroup>
                  {listCategory.map((category, index) => (
                    <CommandItem
                      key={`${category.text}-${index}`}
                      value={category.text}
                      onSelect={(currentValue) => {
                        setListCategory([
                          ...listCategory.map((data) => {
                            return data.text === currentValue
                              ? { ...data, state: !data.state }
                              : data;
                          }),
                        ]);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          category.state ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      {category.text}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default HomeFilterMultiselect;
