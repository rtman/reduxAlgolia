import React, {Component} from 'react';
import { InstantSearch, Index } from 'react-instantsearch/native';
import { 
  connectInfiniteHits,
  connectSearchBox,
  connectHighlight,
  connectStateResults
  } from 'react-instantsearch/connectors';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import HitsSearchingClass from './HitsSearchingClass'

export const HitsSearching = ({hits, hasMore, refine, fieldOne, searching}) => {
  return(
    <HitsSearchingClass
      hits={hits}
      hasMore={hasMore}
      refine={refine}
      fieldOne={fieldOne}
      searching={searching}/>
  )
};


export const HitsConnected =  connectInfiniteHits(connectStateResults(HitsSearching));

export class SearchBoxClass extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
      const styles = {
        searchBarContainer: {
          //flex: 1,
          flexDirection: 'row',
          minHeight: 40,
          borderWidth: 8,
          borderColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
        },
        searchBar: {
          flex: 1,
          fontSize: 14,
          paddingLeft: 10,
          color: 'blue'
        }
      };
    return(
        <View style={styles.searchBarContainer}>
          <TextInput
            ref={'itemSearch'}
            style={styles.searchBar}
            onChangeText={text => this.props.refine(text)}
            value={this.props.currentRefinement}
            placeholder={'Search ...'}
            clearButtonMode={'always'}
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize={'words'}
          />
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={(text) => {this.refs.itemSearch.clear(), this.props.refine('')}}>
                  <Text>
                  X
                  </Text>
              </TouchableOpacity> 
          </View>
        </View>
    )
  }
}
    
export const SearchBox = connectSearchBox(({ refine, currentRefinement, }) => {
  return(
    <SearchBoxClass refine={refine} currentRefinement={currentRefinement}/>
  )
})

