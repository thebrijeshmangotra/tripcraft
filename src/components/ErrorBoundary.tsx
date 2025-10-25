import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import { Button } from "./ui/button";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="max-w-4xl w-full">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-destructive rounded-lg flex items-center justify-center">
                  <span className="text-destructive-foreground font-bold text-xl">
                    !
                  </span>
                </div>
                <div>
                  <CardTitle className="text-2xl text-destructive">
                    Application Error
                  </CardTitle>
                  <p className="text-muted-foreground">
                    A client-side exception has occurred
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {this.state.error && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Error Details</h3>
                  <div className="bg-muted p-4 rounded-lg border">
                    <p className="text-destructive font-mono text-sm">
                      {this.state.error.name}: {this.state.error.message}
                    </p>
                  </div>
                </div>
              )}

              {this.state.error?.stack && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Stack Trace</h3>
                  <div className="bg-card border rounded-lg overflow-hidden">
                    <pre className="p-4 text-xs font-mono overflow-x-auto text-muted-foreground whitespace-pre-wrap">
                      {this.state.error.stack}
                    </pre>
                  </div>
                </div>
              )}

              {this.state.errorInfo?.componentStack && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Component Stack
                  </h3>
                  <div className="bg-card border rounded-lg overflow-hidden">
                    <pre className="p-4 text-xs font-mono overflow-x-auto text-muted-foreground whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={() => window.location.reload()}
                  className="flex-1"
                >
                  Reload Page
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    this.setState({
                      hasError: false,
                      error: null,
                      errorInfo: null,
                    })
                  }
                  className="flex-1"
                >
                  Try Again
                </Button>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>
                  If this error persists, please contact support with the error
                  details above.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    // return this.props.children;
  }
}

export default ErrorBoundary;
