import React from "react";
import { View, Text, TouchableOpacity, StyleSheet,FlatList } from "react-native";
import {ListItem,Icon} from 'react-native-elements'
import db from '../config';
import firebase from 'firebase';
export default class myBarters extends React.Component{
   
    
   
    constructor(){
        super();
      this.state={
          userId:firebase.auth().currentUser.email,
          donorName:"",
          allBarters:[],
          
      }
      this.requestRef=null
    }

  
   
          
   
   
    getAllDonations=()=>{
        this.requestRef=db.collection('all_barters').where('donor_id','==',this.state.userId)
        .onSnapshot((snapshot)=>{
            var allBarters=snapshot.docs.map(document=> document.data());
            this.setState({
           allBarters:allBarters
            })
        })
    }
    keyExtractor=(item,index) => index.toString()



    renderItem =({item,i}) =>(
        <ListItem
        key={i}
        title={item.item_name}
        subtitle={"Requested By:" +item.requested_by +"  " +"Status:"+item.request_status}
        subtitleStyle={{color:"black",marginLeft:20}}
        leftElement={<Icon name="book" type="font-awesome" color="#696969" alignSelf="flex-start" /> }
        titleStyle={{color:"black",fontWeight:'bold',marginLeft:20}}
        rightElement={
            <TouchableOpacity 
            style={{ backgroundColor:"#6F84D7",width:150,height:50,borderBottomLeftRadius:10,
            borderBottomRightRadius:10,borderTopLeftRadius:10,borderTopRightRadius:10
            
            }}
          
            >
                <Text style={{color:'#fff',alignSelf:"center",fontWeight:'bold',marginTop:15}}>Send Item</Text>
            </TouchableOpacity>
        }
        bottomDivider
        />
    )

    componentDidMount(){
       
        this.getAllDonations()
    }
    
    render(){
        return(
            <View>
                <View>
                    {
                        this.state.allBarters.length===0
                        ?(
                            <View>
                                <Text style={{color:"#000000",fontWeight:'bold',fontSize:40,alignSelf:"center",marginTop:300}}>You don't have any Barters currently!</Text>
                            </View>
                        )
                        :(
                            <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.allBarters}
                            renderItem={this.renderItem}

                            />
                        )
                    }
                </View>
            </View>
        )
    }
}