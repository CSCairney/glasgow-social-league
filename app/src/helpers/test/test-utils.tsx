import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { render, RenderOptions } from '@testing-library/react';
import { RootState } from '@/app/store';
import { createStore } from '@/app/store';

interface WrapperProps {
    children: ReactNode;
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: Partial<RootState>;
    store?: ReturnType<typeof createStore>;
}

const renderWithProviders = (
    ui: ReactElement,
    {
        preloadedState = {},
        store = createStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) => {
    function Wrapper({ children }: WrapperProps) {
        return <Provider store={store}>{children}</Provider>;
    }

    return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';
export { renderWithProviders };
