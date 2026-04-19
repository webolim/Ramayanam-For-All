import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#FDFBF7] text-[#2A2118] font-sans">
          <div className="max-w-md w-full bg-white border border-[#E5E0D8] rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} />
            </div>
            <h1 className="text-2xl font-serif font-bold mb-4">ஓரிறு பிழை ஏற்பட்டுள்ளது</h1>
            <p className="text-[#5D4037] mb-8 text-sm">
              We encountered a slight issue while loading this content. Please try refreshing the page.
              <br /><br />
              <span className="font-mono bg-slate-100 px-2 py-1 flex rounded-md overflow-hidden whitespace-nowrap overflow-ellipsis text-xs text-slate-500">
                {this.state.error?.message}
              </span>
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-center gap-2 bg-[#D35400] text-white py-3 rounded-xl font-bold hover:bg-[#b75e18] transition-colors"
            >
              <RefreshCcw size={18} /> Refresh Page
            </button>
          </div>
        </div>
      );
    }

    // @ts-ignore
    return this.props.children;
  }
}
