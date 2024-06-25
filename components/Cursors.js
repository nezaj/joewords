import { Cursors, init } from '@instantdb/react';

const db = init({ appId: "4564aaed-6e6c-46c0-8759-1139eb0c3de8" });

export default function InstantCursors({ roomId, children }) {
  const room = db.room('main', roomId);
  return (
    <Cursors room={room} >
      {children}
    </Cursors>
  );
}
