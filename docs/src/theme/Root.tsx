import React from 'react';
import Root from '@theme-original/Root';
import type RootType from '@theme/Root';
import type { WrapperProps } from '@docusaurus/types';
import ChatButton from '@site/src/components/ChatButton';

type Props = WrapperProps<typeof RootType>;

export default function RootWrapper(props: Props): JSX.Element {
  return (
    <>
      <Root {...props} />
      <ChatButton />
    </>
  );
}
