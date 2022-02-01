import React, { Component, ErrorInfo, ReactNode, useState } from 'react';

export default function ErrorHome() {
    return <>
        <h1>Error Boundary Test</h1>
        <ErrorBoundary>
            ErrorBoundary Start...
            <BuggyCounter></BuggyCounter>
            ErrorBoundary End....
        </ErrorBoundary>
    </>;
}

//----------------------


interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log("error: " + error);
        console.log("errorInfo: " + JSON.stringify(errorInfo));
        console.log("componentStack: " + errorInfo.componentStack);
    }

    public render(): React.ReactNode {
        if (this.state.hasError) {
            return <h1>Sorry.. there was an error</h1>;
        }

        return this.props.children;
    }
}




interface BuggyCounterProps {
    title?: string;
}

interface BuggyCounterState {
    counter: number;
}

export const BuggyCounter = () => {

    const [counter, setCounter] = useState<number>(0)

    const onClicked = () => {
        setCounter((p) => p + 1);
    }

    if (counter == 5) {
        throw new Error("counter crasched at 5 number");
    }
    return <>

        <h2>Buggy Counter</h2>
        Counter: {counter}.
        <button onClick={onClicked}>Increase</button><br></br>
    </>;
};
// Error will not catch by componentDidCatch which trigger from events and callbacks.