import * as types from '../Actions/types'
import update from 'immutability-helper'
import React from 'react';

const initialState = {
    items:{}
}

//function names = state name

export function cart(state = initialState, action) {
	console.log('cartContents action', action)
    switch (action.type) {
        case 'INCREMENT_ITEM':
        	if(state.items.hasOwnProperty(action.item.ikea_id)){
				return (update(state, {
				    items : {
				        [action.item.ikea_id]: {
				            quantity: {$apply: function(x) {return x + 1}}
				        }
				    }
				}))
        	} else {
				return (update(state, {
				    items : {
			    		$merge: {
			    			[action.item.ikea_id]:{
				    			quantity: 1,
					       }
			    		}
				    }
				        
				}))
        	} 

        default:
            return state;
    }
}