import React, {Component} from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../Actions'

export class HitsSearchingClass extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const styles = StyleSheet.create({
      itemHeader1: {
          fontSize: 14,
      },
      itemRowsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
      },

      cartQuantityButton: {
        backgroundColor: 'red',
        width: 50,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
    });

    console.log('this.props', this.props)
    if(this.props.searching){
      return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <View>
            <Text style={{color: 'red', fontSize: 40}}>
              searching = TRUE
            </Text>
          </View>
        </View>
      )
    } else {
      return(
          <FlatList
            data={this.props.hits}
            onEndReached={this.props.onEndReached}
            keyExtractor={(item, index) => item.objectID}
            renderItem={({ item }) => {
              return (
                <View style={styles.itemRowsContainer}>
                   <Text style={styles.itemHeader1}>
                     {item.name}
                   </Text>
                     <View style={{flexDirection: 'row', paddingTop: 8, justifyContent: 'space-between', alignItems: 'center'}}>             
                        <Text style={{color: 'black', fontSize: 30}}>
                          {this.props.cart.items === undefined ?
                            0
                          : this.props.cart.items[item.ikea_id] === undefined ?
                            0
                          :
                            this.props.cart.items[item.ikea_id].quantity
                          }
                        </Text>
                        <TouchableOpacity style={{paddingLeft: 8}} onPress={() => this.props.incrementItem(item)}>
                          <View style={styles.cartQuantityButton}>
                              <Text style={{fontSize: 30, color: 'black'}}>
                                +
                              </Text>
                          </View>
                        </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
      );
    } 
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

export default connect(() => mapStateToProps, mapDispatchToProps)(HitsSearchingClass);
