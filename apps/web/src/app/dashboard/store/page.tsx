'use client';

import TicketActiveCard from '@/components/ticket-active-card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSession } from '@/lib/jwt';
import { signUpOrganizerThunk } from '@/redux/features/auth-thunk';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import LocalTooltips from '@/components/local-tooltips';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  addEventThunk,
  getEventsActiveThunk,
  getEventsInactiveThunk,
} from '@/redux/features/mystore-thunk';
import Image from 'next/image';
import Link from 'next/link';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Store = () => {
  const user = useAppSelector((state) => state.authReducer.user);
  const events = useAppSelector((state) => state.mystoreReducer.events);
  const inactiveEvents = useAppSelector(
    (state) => state.mystoreReducer.inactiveEvents,
  );

  const dispatch = useAppDispatch();

  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const [file, setFile] = useState<any>([]);

  const listCategoryDummy = ['Sport', 'Concert', 'Art', 'Conference'];

  const [listCategory, setListCategory] = useState(
    listCategoryDummy.map((data) => {
      return { text: data, state: false };
    }),
  );

  const handleCategoryChange = (currentValue: string) => {
    setListCategory((prevListCategory) =>
      prevListCategory.map((data) =>
        data.text === currentValue ? { ...data, state: !data.state } : data,
      ),
    );

    formik.setFieldValue(
      'category',
      listCategory
        .filter((data) => data.state === true)
        .map((data) => data.text),
    );
  };

  const handleDateChange = (day: Date | undefined) => {
    setDate(day);
    formik.setFieldValue('date', day);
  };

  const handleChangeFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const eventSchema = Yup.object({
    title: Yup.string()
      .required('Title is required')
      .min(6, 'Must be exactly 5 digits minimum')
      .max(191, 'Must be exactly 191 digits maximum'),
    description: Yup.string()
      .required('Title is required')
      .min(6, 'Must be exactly 5 digits minimum')
      .max(500, 'Must be exactly 500 digits maximum'),
    location: Yup.string()
      .required('Location is required')
      .max(191, 'Must be exactly 191 digits maximum'),
    date: Yup.date().required('Date is required'),
    time: Yup.string().required('Time is required'),
    price: Yup.number().required('Time is required, set 0 if free'),
    category: Yup.array()
      .required('Category is required')
      .min(1, 'At least one category is required'),
    dimensionX: Yup.number().required('Dimension X is required'),
    dimensionY: Yup.number().required('Dimension Y is required'),
    // thumbnail: Yup.mixed().required('thumbnail is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      location: '',
      date: new Date(),
      time: '',
      price: 0,
      category: [],
      dimensionX: 0,
      dimensionY: 0,
      // thumbnail: undefined,
    },
    validationSchema: eventSchema,
    onSubmit: (values) => {
      console.log('Event:', values);

      const combinedDateTime = new Date(
        values.date.getFullYear(),
        values.date.getMonth(),
        values.date.getDate(),
        parseInt(values.time.split(':')[0]),
        parseInt(values.time.split(':')[1]),
      );

      dispatch(
        addEventThunk({
          title: values.title,
          description: values.description,
          location: values.location,
          dateTime: combinedDateTime,
          price: values.price,
          category: values.category,
          dimensionX: values.dimensionX,
          dimensionY: values.dimensionY,
          thumbnail: file,
        }),
      );

      setOpenSheet(false);
    },
  });

  useEffect(() => {
    formik.setFieldValue(
      'category',
      listCategory
        .filter((data) => data.state === true)
        .map((data) => data.text),
    );

    dispatch(getEventsActiveThunk());
    dispatch(getEventsInactiveThunk());
  }, [listCategory]);

  return (
    <>
      <div className="w-full h-full flex justify-center p-12">
        {user &&
          (user.role.includes(2) ? (
            <>
              <Tabs defaultValue="account" className="w-full lg:w-[720px]">
                <TabsList className="!p-0">
                  <TabsTrigger value="account">
                    <span className="px-3">Active Event</span>
                  </TabsTrigger>
                  <TabsTrigger value="password">
                    <span className="px-3">History Event</span>
                  </TabsTrigger>
                </TabsList>
                <Separator orientation="horizontal" />
                <TabsContent
                  className="pt-6 gap-4 flex flex-col"
                  value="account"
                >
                  <div className="">
                    <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                      <SheetTrigger asChild>
                        <Button>Add Event</Button>
                      </SheetTrigger>
                      <SheetContent
                        side={'bottom'}
                        className="h-[80%] w-full overflow-y-auto"
                      >
                        <form
                          className="h-full w-full"
                          onSubmit={formik.handleSubmit}
                        >
                          <SheetHeader className="flex flex-col items-start">
                            <SheetTitle>Add Event</SheetTitle>
                            <SheetDescription className="text-start">
                              Make changes to your profile here. Click save when
                              you're done.
                            </SheetDescription>
                          </SheetHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4 gap-y-1">
                              <Label htmlFor="title" className="text-right">
                                Title
                              </Label>
                              <Input
                                type="text"
                                id="title"
                                className={`col-span-3 ${
                                  Boolean(formik.errors.title) &&
                                  'border-red-500 !ring-red-500'
                                }`}
                                onChange={formik.handleChange}
                                value={formik.values.title}
                              />
                              {Boolean(formik.errors.title) && (
                                <span className="col-start-2 text-sm text-red-500">
                                  {formik.errors.title}
                                </span>
                              )}
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4 gap-y-1">
                              <Label
                                htmlFor="description"
                                className="text-right pt-2.5"
                              >
                                Description
                              </Label>
                              <Textarea
                                id="description"
                                className={`col-span-3 ${
                                  Boolean(formik.errors.description) &&
                                  'border-red-500 !ring-red-500'
                                }`}
                                onChange={formik.handleChange}
                                value={formik.values.description}
                              />
                              {Boolean(formik.errors.description) && (
                                <span className="col-start-2 text-sm text-red-500">
                                  {formik.errors.description}
                                </span>
                              )}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4 gap-y-1">
                              <Label
                                htmlFor="location"
                                className="text-right pt-2.5"
                              >
                                Location
                              </Label>
                              <Input
                                id="location"
                                className={`col-span-3 ${
                                  Boolean(formik.errors.location) &&
                                  'border-red-500 !ring-red-500'
                                }`}
                                onChange={formik.handleChange}
                                value={formik.values.location}
                              />
                              {Boolean(formik.errors.location) && (
                                <span className="col-start-2 text-sm text-red-500">
                                  {formik.errors.location}
                                </span>
                              )}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4 gap-y-1">
                              <Label
                                htmlFor="date"
                                className="text-right pt-2.5"
                              >
                                Date
                              </Label>
                              <Popover>
                                <PopoverTrigger className="w-full" asChild>
                                  <Button
                                    variant={'outline'}
                                    className={cn(
                                      'col-span-3 justify-start text-left font-normal',
                                      !date && 'text-muted-foreground',
                                      Boolean(formik.errors.date) &&
                                        'border-red-500 !ring-red-500',
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? (
                                      format(date, 'PPP')
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    id="date"
                                    selected={date}
                                    onSelect={handleDateChange}
                                    fromDate={new Date()}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              {Boolean(formik.errors.date) && (
                                <span className="col-start-2 text-sm text-red-500">
                                  {String(formik.errors.date)}
                                </span>
                              )}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4 gap-y-1">
                              <Label htmlFor="location" className="text-right">
                                Time
                              </Label>
                              <Input
                                id="time"
                                className={`col-span-3 ${
                                  Boolean(formik.errors.time) &&
                                  'border-red-500 !ring-red-500'
                                }`}
                                type="time"
                                onChange={formik.handleChange}
                                value={formik.values.time}
                              />
                              {Boolean(formik.errors.time) && (
                                <span className="col-start-2 text-sm text-red-500">
                                  {formik.errors.time}
                                </span>
                              )}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4 gap-y-1">
                              <Label htmlFor="price" className="text-right">
                                Price
                              </Label>
                              <Input
                                id="price"
                                className={`col-span-3 ${
                                  Boolean(formik.errors.price) &&
                                  'border-red-500 !ring-red-500'
                                }`}
                                type="number"
                                onChange={formik.handleChange}
                                value={formik.values.price}
                              />
                              {Boolean(formik.errors.price) && (
                                <span className="col-start-2 text-sm text-red-500">
                                  {formik.errors.price}
                                </span>
                              )}
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4 gap-y-1">
                              <Label
                                htmlFor="category"
                                className="text-right pt-2.5"
                              >
                                Categories
                              </Label>
                              <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className={`col-span-3 flex justify-between ${
                                      Boolean(formik.errors.category) &&
                                      'border-red-500 !ring-red-500'
                                    }`}
                                  >
                                    <LocalTooltips
                                      content={
                                        listCategory.length === 0
                                          ? `Search category...`
                                          : listCategory
                                              .filter(
                                                (data) => data.state === true,
                                              )
                                              .map((data) => data.text)
                                              .join(', ')
                                      }
                                    >
                                      <div className="w-full flex justify-between">
                                        <span className="w-full text-start overflow-hidden truncate">
                                          {listCategory.length === 0
                                            ? `Search category...`
                                            : listCategory
                                                .filter(
                                                  (data) => data.state === true,
                                                )
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
                                    <CommandInput
                                      placeholder={`Search category...`}
                                    />
                                    <CommandList>
                                      <CommandEmpty>
                                        No Category found.
                                      </CommandEmpty>
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
                                                category.state
                                                  ? 'opacity-100'
                                                  : 'opacity-0',
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
                              {Boolean(formik.errors.category) && (
                                <span className="col-start-2 text-sm text-red-500">
                                  {formik.errors.category}
                                </span>
                              )}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4 gap-y-1">
                              <Label htmlFor="dimension" className="text-right">
                                Dimensions
                              </Label>
                              <Input
                                id="dimensionX"
                                placeholder="X"
                                type="number"
                                className={`${
                                  Boolean(formik.errors.dimensionX) &&
                                  'border-red-500 !ring-red-500'
                                }`}
                                onChange={formik.handleChange}
                                value={formik.values.dimensionX}
                              />
                              <Input
                                id="dimensionY"
                                placeholder="Y"
                                type="number"
                                className={`${
                                  Boolean(formik.errors.dimensionY) &&
                                  'border-red-500 !ring-red-500'
                                }`}
                                onChange={formik.handleChange}
                                value={formik.values.dimensionY}
                              />
                              <span className="font-semibold tracking-tighter text-sm">
                                Total:{' '}
                                {formik.values.dimensionX *
                                  formik.values.dimensionY}
                              </span>
                              {Boolean(formik.errors.dimensionX) && (
                                <span className="col-start-2 text-sm text-red-500">
                                  {formik.errors.dimensionX}
                                </span>
                              )}
                              {Boolean(formik.errors.dimensionY) && (
                                <span className="text-sm text-red-500">
                                  {formik.errors.dimensionY}
                                </span>
                              )}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4 gap-y-1">
                              <Label htmlFor="thumbnail" className="text-right">
                                Thumbnail
                              </Label>
                              <Input
                                id="thumbnail"
                                className={`col-span-3 
          
                                `}
                                type="file"
                                accept="image/*"
                                // onChange={formik.handleChange}
                                onChange={handleChangeFile}
                              />
                              {/* {Boolean(formik.errors.thumbnail) && (
                                <span className="col-start-2 text-sm text-red-500">
                                  {formik.errors.thumbnail}
                                </span>
                              )} */}
                            </div>
                          </div>
                          <SheetFooter>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button className="mb-12">Save</Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    Are you absolutely sure?
                                  </DialogTitle>
                                  <DialogDescription>
                                    This action cannot be undone. This will
                                    permanently add event to server.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="gap-2">
                                  <DialogClose className="w-full">
                                    <Button
                                      className="w-full bg-white hover:bg-white/90 text-slate-800"
                                      variant={'outline'}
                                    >
                                      Cancel
                                    </Button>
                                  </DialogClose>
                                  <DialogClose className="w-full">
                                    <Button
                                      className="w-full"
                                      onClick={() => formik.submitForm()}
                                    >
                                      I'm Sure
                                    </Button>
                                  </DialogClose>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </SheetFooter>
                        </form>
                      </SheetContent>
                    </Sheet>
                  </div>
                  {events.length > 0 ? (
                    events.map((data, index) => (
                      <Link
                        key={`${data.id}-${index}`}
                        href={`/dashboard/store/active/${data.id}`}
                      >
                        <TicketActiveCard
                          src={data.eventImage}
                          title={data.title}
                          location={data.eventLocation}
                          time={new Date(data.eventAt).toLocaleTimeString()}
                          date={format(
                            new Date(data.eventAt).toLocaleDateString(),
                            'PPP',
                          )}
                        />
                      </Link>
                    ))
                  ) : (
                    <>
                      <span>You don't have active ticket</span>
                    </>
                  )}
                </TabsContent>
                <TabsContent
                  className="pt-6 gap-4 flex flex-col"
                  value="password"
                >
                  {inactiveEvents.length > 0 ? (
                    inactiveEvents.map((data, index) => (
                      <Link
                        key={`${data.id}-${index}`}
                        href={`/dashboard/store/inactive/${data.id}`}
                      >
                        <TicketActiveCard
                          key={`${data.id}-${index}`}
                          src={data.eventImage}
                          title={data.title}
                          location={data.eventLocation}
                          time={new Date(data.eventAt).toLocaleTimeString()}
                          date={format(
                            new Date(data.eventAt).toLocaleDateString(),
                            'PPP',
                          )}
                        />
                      </Link>
                    ))
                  ) : (
                    <>
                      <span>You don't have inactive events</span>
                    </>
                  )}
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <>
              <div className="h-full w-fit flex flex-col items-center gap-2.5">
                <span>You are not an organizer yet</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>I wanna be an organizer</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently make you be organizer.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2">
                      <DialogClose className="w-full">
                        <Button
                          className="w-full bg-white hover:bg-white/90 text-slate-800"
                          variant={'outline'}
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                      <DialogClose className="w-full">
                        <Button
                          className="w-full"
                          onClick={() => dispatch(signUpOrganizerThunk())}
                        >
                          I'm Sure
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </>
          ))}
      </div>
    </>
  );
};

export default Store;
