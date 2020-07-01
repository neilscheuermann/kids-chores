import React from 'react';
import { ApolloProvider } from 'react-apollo'
import './App.css';
import { createClient } from './util/apollo'
import Chores from './Chores'

function App() {
  const client = createClient()

  return (
    <ApolloProvider client={client}>
      <Chores />
    </ApolloProvider>
  );
}

export default App;
