---
title: 'useRef vs useState'
date: '2023-11-19'
author: "nezaj"
---

## Context
I sometimes find myself googling `useRef` vs `useState` and found it helpful to talk to ChatGPT about it. Specifically I wanted some concrete examples of when `useRef` is more beneficial. ChatGPT did a pretty good job at this. I cleaned up the conversation and packaged into a post so that it may be helpful for others in the future!

## useRef vs useState
`useState` and `useRef` are both hooks provided by React, but they serve different purposes and are used in different scenarios:

### useState
1. **Purpose**: It's used to declare a state variable in functional components. This state is reactive, meaning that updating the state causes the component to re-render.
2. **Usage**: Ideal for values that drive the UI and need to trigger a re-render when changed.
3. **Syntax**: `const [state, setState] = useState(initialValue);`
4. **Behavior**: When the state updates, the component re-renders.
5. **Example**: Handling form inputs, toggling UI elements, tracking user choices.

### useRef
1. **Purpose**: It's used to create a mutable ref object that persists for the full lifetime of the component. The ref object does not trigger a re-render when its content changes.
2. **Usage**: Useful for accessing DOM elements directly, storing a mutable value that does not cause re-renders when changed, and persisting values across renders without causing updates.
3. **Syntax**: `const ref = useRef(initialValue);`
4. **Behavior**: Changing the `.current` property does not cause the component to re-render.
5. **Example**: Accessing a DOM element (like an input field), storing an interval or timeout ID, keeping track of the previous value of a prop or state.

### When to Use One Over the Other
- **Use `useState`** when you need a value that, when updated, should cause the component to re-render. It's typically used for data that is tied to the UI.
- **Use `useRef`** when you need a mutable reference to a DOM element or you need to store a value persistently across renders without causing re-renders. It's not suitable for triggering UI updates.

In summary, `useState` is for state management that is tied to the render cycle, while `useRef` is for accessing DOM elements or keeping track of data across renders without influencing the render cycle.


## Examples
Here are ten examples that I thought were neat.

### 1. Accessing DOM Elements
```javascript
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    inputEl.current.focus();
  };

  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```
**Explanation**: This helps in managing DOM state without causing unnecessary re-renders

### 2. Timer ID for `setTimeout` or `setInterval`
```javascript
function TimerComponent() {
    const timerId = useRef(null);

    useEffect(() => {
        timerId.current = setInterval(() => console.log('Tick'), 1000);

        return () => clearInterval(timerId.current);
    }, []);

    // ...
}
```
**Explanation**: Store a timer ID for `setInterval` or `setTimeout`. This allows you to clear the timer in the cleanup function of `useEffect` without re-rendering the component every time the timer ID changes.

### 3. Counting Component Renders
```javascript
function RenderCounterComponent() {
    const renderCount = useRef(0);

    useEffect(() => {
        renderCount.current += 1;
    });

    // ...
}
```
**Explanation**: Keep track of how many times the component has rendered. This count is for internal use and doesn't trigger additional renders.

### 4. Storing the Previous Render's Props or State
```javascript
function ComponentWithPreviousProps(props) {
    const prevProps = useRef();

    useEffect(() => {
        prevProps.current = props;
    }); // No dependency array, runs after every render

    // Compare props.current with prevProps.current for changes
    // ...
}
```
**Explanation**: Useful for comparing the previous and current props or state values, for instance, to detect specific changes or manage transitions.

### 5. Flag for Avoiding Initial Effect Run
```javascript
function ComponentWithSkipFirstEffect() {
    const isFirstRun = useRef(true);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        // Effect logic to run from the second render onwards
    });
    // ...
}
```
**Explanation**: This pattern is useful when you want an effect to run on updates only, not on the initial mount.

### 6. Throttling Function Calls
```javascript
function ThrottledComponent() {
    const lastCalled = useRef(Date.now());

    const throttledFunction = () => {
        if (Date.now() - lastCalled.current >= 1000) {
            lastCalled.current = Date.now();
            // Execute some action
        }
    };

    // ...
}
```
**Explanation**: `useRef` is used to store the timestamp of the last function call, ensuring the function is called no more than once per second.

### 7. Tracking Mouse Position
```javascript
function MouseTrackerComponent() {
    const mousePosition = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mousePosition.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // ...
}
```
**Explanation**: Store the latest mouse position without re-rendering the component each time the mouse moves.

### 8. Custom Event Listener with Clean-up
```javascript
function EventListenerComponent() {
    const eventListener = useRef(null);

    useEffect(() => {
        eventListener.current = (e) => {
            // Handle event
        };
        window.addEventListener('customEvent', eventListener.current);

        return () => window.removeEventListener('customEvent', eventListener.current);
    }, []);

    // ...
}
```
**Explanation**: Store a reference to an event listener function, making it easy to add and remove the same instance of the listener for proper cleanup.

### 9. Controlling Render-Independent Animation
```javascript
function AnimationComponent() {
    const animationFrameId = useRef(null);

    const animate = () => {
        // Animation logic here
        animationFrameId.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        animationFrameId.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId.current);
    }, []);

    // ...
}
```
**Explanation**: Manage the ID of an animation frame when using `requestAnimationFrame`. This is useful for animations that are independent of React's rendering logic.

### 10. Persisting the Latest State in Callbacks
```javascript
function ComponentWithLatestState() {
    const [count, setCount] = useState(0);
    const latestCount = useRef(count);

    useEffect(() => {
        latestCount.current = count;
    }, [count]);

    const someDelayedAction = useCallback(() => {
        console.log(latestCount.current); // Always logs the latest count
    }, []);
    // ...
}
```
**Explanation**: Here, `useRef` is used to keep a reference to the latest state value for use in callbacks or event handlers, ensuring they always have access to the current state.
