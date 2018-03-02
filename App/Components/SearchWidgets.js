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

export const HitsSearching = ({cart, incrementItem, hits, hasMore, refine, fieldOne, searching}) => {
  return(
    <HitsSearchingClass
      cart={cart}
      incrementItem={incrementItem}
      hits={hits}
      hasMore={hasMore}
      refine={refine}
      fieldOne={fieldOne}
      searching={searching}/>
  )
};

export class HitsSearchingClass extends React.Component{

  componentWillMount(){
    console.log('HitsSearchingClass Mount')
  }

  componentWillUnMount(){
    console.log('HitsSearchingClass Unmount')    
  }

  componentWillMount(){
    console.log('HitsSearchingClass WillMount')
  }

  componentWillUnmount(){
    console.log('HitsSearchingClass Will Un Mount')
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

    console.log('HITS CONNECTED SEARCHING', this.props.searching);
    console.log('HITS = ', this.props.hits)
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
                     <Highlight attributeName={this.props.fieldOne} hit={item} />
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

export const Highlight = connectHighlight(({ highlight, attributeName, hit, highlightProperty }) => {
  const parsedHit = highlight({
    attributeName,
    hit,
    highlightProperty: '_highlightResult',
  });
  //console.log('parsedHit', parsedHit);
  const highlightedHit = parsedHit.map((part, idx) => {
    //console.log('highlightedHit', highlightedHit)
    if (part.isHighlighted)
      return (
        <Text key={idx} style={{ backgroundColor: 'gray' }}>
          {part.value}
        </Text>
      );
    return part.value;
  });
  return <Text>{highlightedHit}</Text>;
});


