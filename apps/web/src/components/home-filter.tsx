'use client';

import React, { useEffect, useState } from 'react';
import HomeFilterMultiselect from '@/components/home-filter-multiselect';
import { Slider } from '@/components/ui/slider';
import HomeFilterInputPrice from './home-filter-input-price';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  findEventThunk,
  getEventLocationsThunk,
} from '@/redux/features/app-thunk';
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
import { Button } from './ui/button';
import { Label } from './ui/label';

import dynamic from 'next/dynamic';

const LocalTooltips = dynamic(() => import('@/components/local-tooltips'), {
  ssr: false,
});

const HomeFilter = () => {
  const listCategoryDummy = ['Sport', 'Concert', 'Art', 'Conference'];
  const searchText = useAppSelector((state) => state.appReducer.searchText);

  const eventLocations = useAppSelector(
    (state) => state.appReducer.eventLocations,
  );

  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  // const [rangePrice, setRangePrice] = useState<number[]>([0, 0]);
  const dispatch = useAppDispatch();

  const [listCategory, setListCategory] = useState<
    { text: string; state: boolean }[]
  >([]);

  const [listLocation, setListLocation] = useState<
    { text: string; state: boolean }[]
  >([]);

  const handleCategoryChange = (currentValue: string) => {
    setListCategory((prevListCategory) =>
      prevListCategory.map((data) =>
        data.text === currentValue ? { ...data, state: !data.state } : data,
      ),
    );
  };

  const handleLocationsChange = (currentValue: string) => {
    setListLocation((prevListCategory) =>
      prevListCategory.map((data) =>
        data.text === currentValue ? { ...data, state: !data.state } : data,
      ),
    );
  };

  const onFilterHandle = () => {
    dispatch(
      findEventThunk({
        title: searchText,
        category: listCategory
          .filter((data) => data.state === true)
          .map((data) => data.text),
        eventLocation: listLocation
          .filter((data) => data.state === true)
          .map((data) => data.text),
      }),
    );
  };

  if (listLocation.length === 0 && eventLocations.length > 0) {
    setListLocation(
      eventLocations.map((data) => {
        return { text: data, state: false };
      }),
    );
  }

  if (listCategory.length === 0 && listCategoryDummy.length > 0) {
    setListCategory(
      listCategoryDummy.map((data) => {
        return { text: data, state: false };
      }),
    );
  }

  useEffect(() => {
    dispatch(getEventLocationsThunk());
  }, []);

  return (
    <>
      <div className="relative lg:sticky lg:top-24 w-full lg:w-[480px] h-fit shadow-xl rounded-xl">
        <div className="px-6 py-3 rounded-t-xl bg-slate-100">
          <span className="text-slate-800 font-medium">Filter</span>
        </div>
        <div className="px-6 py-6 flex flex-col gap-8 bg-white rounded-b-xl">
          {/* <div className="flex flex-col gap-8">
            <Slider
              defaultValue={[0, 10000]}
              max={10000}
              step={100}
              onValueChange={setRangePrice}
            />
            <div className="flex flex-row gap-4">
              <HomeFilterInputPrice title="Minimum" value={rangePrice[0]}/>
              <HomeFilterInputPrice title="Maximum"  value={rangePrice[1]}/>
            </div>
          </div> */}

          {/* <HomeFilterMultiselect
            className="w-full"
            list={listCategoryDummy}
            title="Category"
          />
          {eventLocations.join(', ')} */}
          {searchText}
          <div className={`flex flex-col gap-2 w-full`}>
            <Label htmlFor="category">Category</Label>
            <Popover open={openCategory} onOpenChange={setOpenCategory}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full flex justify-between"
                >
                  <LocalTooltips
                    content={
                      listLocation.length === 0
                        ? `Search category...`
                        : listCategory
                            .filter((data) => data.state === true)
                            .map((data) => data.text)
                            .join(', ')
                    }
                  >
                    <div className="w-full flex justify-between">
                      <span className="w-full text-start overflow-hidden truncate">
                        {listLocation.length === 0
                          ? `Search category...`
                          : listCategory
                              .filter((data) => data.state === true)
                              .map((data) => data.text)
                              .join(', ')}
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </div>
                  </LocalTooltips>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[270px] p-0">
                <Command>
                  <CommandInput placeholder={`Search category...`} />
                  <CommandList>
                    <CommandEmpty>No Category found.</CommandEmpty>
                    <CommandGroup>
                      {listCategory.map((category, index) => (
                        <CommandItem
                          key={`${category.text}-${index}`}
                          value={category.text}
                          onSelect={handleCategoryChange}
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
          <div className={`flex flex-col gap-2 w-full`}>
            <Label htmlFor="category">Location</Label>
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
                      listLocation.length === 0
                        ? `Search location...`
                        : listLocation
                            .filter((data) => data.state === true)
                            .map((data) => data.text)
                            .join(', ')
                    }
                  >
                    <div className="w-full flex justify-between">
                      <span className="w-full text-start overflow-hidden truncate">
                        {listLocation.length === 0
                          ? `Search location...`
                          : listLocation
                              .filter((data) => data.state === true)
                              .map((data) => data.text)
                              .join(', ')}
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </div>
                  </LocalTooltips>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[270px] p-0">
                <Command>
                  <CommandInput placeholder={`Search location...`} />
                  <CommandList>
                    <CommandEmpty>No Category found.</CommandEmpty>
                    <CommandGroup>
                      {listLocation.map((category, index) => (
                        <CommandItem
                          key={`${category.text}-${index}`}
                          value={category.text}
                          onSelect={handleLocationsChange}
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
          <Button onClick={onFilterHandle}>Filter</Button>
        </div>
      </div>
    </>
  );
};

export default HomeFilter;
