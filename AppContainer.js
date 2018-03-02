import React, { Component } from 'react';
import {
  AppRegistry,
  View,
} from 'react-native';
import {InstantSearch, Configure} from 'react-instantsearch/native';
import { 
    HitsConnected,
    SearchBox,
 } from './App/Components/SearchWidgets'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from './App/Actions'

export class AppContainer extends React.Component {
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
              fieldOne="name"
              incrementItem={this.props.incrementItem}
              cart={this.props.cart}/>
        </InstantSearch>
      </View>
    )
  }
}

//redux

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

export default connect(() => mapStateToProps, mapDispatchToProps)(AppContainer);
