import React, { FC, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { queries, render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react';
import { getStore } from './app/store';

let applicationStore = getStore();

const resetStore = () => {
  applicationStore = getStore();
};

const StoreProvider: FC = ({ children }) => {
  return <Provider store={applicationStore}>{children}</Provider>;
};

const mockReactUseEffect = jest.spyOn(React, 'useEffect');

type Q = typeof queries;

export type ComponentType = RenderResult<Q>;

const render = (
  ui: ReactElement,
  options: RenderOptions = {},
): ComponentType => rtlRender(ui, { wrapper: StoreProvider, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export {
  applicationStore as store,
  mockReactUseEffect,
  resetStore,
  render,
};
