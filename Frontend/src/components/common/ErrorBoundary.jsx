import {
  Component,
} from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(
    error,
    errorInfo
  ) {
    console.log(
      error,
      errorInfo
    );
  }

  render() {
    if (
      this.state.hasError
    ) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-3xl font-bold">
            Something went wrong.
          </h1>
        </div>
      );
    }

    return this.props
      .children;
  }
}

export default ErrorBoundary;