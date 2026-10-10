import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // TODO: Return state that tells React an error occurred
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // TODO: Log the error for debugging
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please try again.</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
