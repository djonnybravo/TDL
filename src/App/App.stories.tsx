import type { Meta, StoryObj } from '@storybook/react';
import React from "react";
import App from "./App";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";


const meta: Meta<typeof App> = {
  title: 'TODOLISTS/App',
  component: App,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator]

};

export default meta;
type Story = StoryObj<typeof App>;

export const AppWithReduxStory: Story = {
  // render: () =>  <Provider store={store}> <App/> </Provider>
};


