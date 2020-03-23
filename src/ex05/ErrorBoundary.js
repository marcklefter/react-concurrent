import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = {
    error: null
  }

  static getDerivedStateFromError(error) {
    return {
      error
    }
  }

  render() {
    const {
      error
    } = this.state;

    if (error) {
      return 'An error occurred: ' + error.message;
    }

    return this.props.children;
  }
}