'use client';

import React, { useState } from 'react';
import HomeFilterMultiselect from '@/components/home-filter-multiselect';
import { Slider } from '@/components/ui/slider';
import HomeFilterInputPrice from './home-filter-input-price';

const HomeFilter = () => {
  const listCategoryDummy = ['Sport', 'Concert', 'Art', 'Conference'];
  const listLocationDummy = ['Jakarta', 'Semarang', 'Pati', 'Surabaya'];

  const [rangePrice, setRangePrice] = useState<number[]>([0, 0]);

  return (
    <>
      <div className="sticky top-24 w-fit h-fit shadow-xl rounded-xl">
        <div className="px-6 py-3 rounded-t-xl bg-slate-100">
          <span className="text-slate-800 font-medium">Filter</span>
        </div>
        <div className="px-6 py-6 flex flex-col gap-8 bg-white rounded-b-xl">
          <div className="flex flex-col gap-8">
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
          </div>

          <HomeFilterMultiselect
            className="w-full"
            list={listCategoryDummy}
            title="Category"
          />
          <HomeFilterMultiselect list={listLocationDummy} title="Location" />
        </div>
      </div>
    </>
  );
};

export default HomeFilter;
