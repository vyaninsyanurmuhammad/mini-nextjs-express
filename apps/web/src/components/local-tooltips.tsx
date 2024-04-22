import React, { ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const LocalTooltips = ({
  children,
  content,
  align,
}: {
  children: ReactNode;
  content?: ReactNode;
  align?: 'center' | 'end' | 'start';
}) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="w-full" asChild>
            {children}
          </TooltipTrigger>
          <TooltipContent align={align}>{content}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default LocalTooltips;
