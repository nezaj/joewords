---
title: 'Add multiple cursors to your website'
date: '2024-06-25'
author: "nezaj"
---

**Tl;DR** You can add multiple cursors to to your website or app using this
snippet below (what I'm using for this page). To do fancy stuff like customize
cursor appearance, [you can check out out some more examples]("https://www.instantdb.com/examples#4-custom-cursors")
```javascript
import { Cursors, init } from '@instantdb/react';

const db = init({
  // Replace this with your own app id you get from
  // instantdb.com when you create a new app
  // This will work as is, but you'll be sharing
  // the same app id with everyone else
  appId: "4564aaed-6e6c-46c0-8759-1139eb0c3de8"
});

export default function InstantCursors({ roomType, roomId, children }) {
  const room = db.room(roomType, roomId);
  return (
    <Cursors room={room}>
      {children}
    </Cursors>
  );
}
```

Last week I was talking with one of our users on how they discovered [Instant](https://www.instantdb.com/) and
what made them want to try us. It was fun to discover they found us while trying
[to learn about multiplayer](https://stopa.io/post/296) and that their "aha!"
moment was when they tried adding mulitple cursors to their website with Instant.

This morning I woke up and saw that one of Tonksy's posts is on the [front page
of HN](https://news.ycombinator.com/item?id=40786425). He uses multiple cursors
and I think it's interesting how much chatter is generated around this feature.
