import React, { Component } from 'react';
import {
  AppRegistry,
  View,
} from 'react-native';
import {InstantSearch } from 'react-instantsearch/native';
import { 
    HitsConnected,
    SearchBox,
 } from './App/Components/SearchWidgets'

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <InstantSearch
          appId="latency"
          apiKey="6be0576ff61c053d5f9a3225e2a90f76"
          indexName="ikea">
          <SearchBox/>
          <HitsConnected
              fieldOne="name"/>
        </InstantSearch>
      </View>
    )
  }
}


