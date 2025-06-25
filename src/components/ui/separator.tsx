// This component not imported from the shadcn library, I mean ofc look at it
// export function Separator() {
//   return <hr className="my-4 border-muted opacity-50" />
// }

import { FaEllipsisH } from "react-icons/fa";

export function Separator() {
  return (
    <div className="my-4 flex items-center gap-5">
      <div className="flex-1 h-px bg-muted opacity-50" />
      <FaEllipsisH className="text-secondary" />
      <div className="flex-1 h-px bg-muted opacity-50" />
    </div>
  );
}
