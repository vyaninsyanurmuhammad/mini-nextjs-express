'use client';

import { getSessionThunk } from '@/redux/features/auth-thunk';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import React, { useEffect } from 'react';

const Profile = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.authReducer.user);

  useEffect(() => {
    if (!user) {
      dispatch(getSessionThunk());
    }
  }, [user]);

  return (
    <>
      <div className="flex w-full overflow-hidden">
        <div className="w-full px-12 pb-12 pt-40 flex gap-6 bg-blue-crayola-100 overflow-hidden">
          <div className="w-14 lg:w-24 h-14 lg:h-24 rounded-full bg-slate-blue-800 flex flex-shrink-0 justify-center items-center">
            <span className="font-bold text-white text-3xl">
              {user && user.name[0].toLocaleUpperCase()}
            </span>
          </div>
          <div className="w-full flex flex-col gap-3 justify-center overflow-hidden">
            <div className="w-full flex flex-col gap-0 justify-center">
              <span className="text-2xl/none font-semibold tracking-tighter w-full truncate overflow-hidden">
                {user && user.name}
              </span>

              <span className="text-lg tracking-tighter w-full truncate overflow-hidden">
                {user && user.email}
              </span>
            </div>

            {user && (
              <div className="flex flex-row gap-2.5 flex-wrap">
                {user.role.map((data) => (
                  <span className="py-1 px-4 rounded-full bg-white text-sm">
                    {data === 1 ? 'Customer' : 'Organizer'}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
