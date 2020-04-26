import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
TextInput,TouchableOpacity,FlatList
} from 'react-native';
import { Card } from 'native-base';
export default class Login extends Component{
    constructor(props){
        super(props);
      }
      RandomIds=[ "2189058","207854", "963589", "845634", "278156", "985674", "201756","314057","978546","278156", "985674", "648756","874057","978546","278156", "965674", "410758","714057","973546" ];
        state = {
          InputId:'',
          ButtonStateHolder : false,
          showList: false,
          showdetails:false,
          matched_id:true,
          IdDetails:[],
          RanAstoidId:'',
        };
      SubmitId(){
        this.setState({matched_id: false});
      }
      // Calling Random key function
      Call_Random_Ast(){
        this.setState({matched_id: true});
        this.setState({showList: !this.state.showList});
        this.fetchData();
    }
    // Fetching Random key
    fetchData = async () => {
     const response = await fetch("https://api.nasa.gov/neo/rest/v1/neo/browser?api_key=lhi3ws6CLrq00KzZZUDgyB9SKLpkvklhR8TavgMQ")
     .then((response) => response.json())
     .then((responseJson) => {
       alert(JSON.stringify(responseJson));
       if(responseJson.status=='SUCCESS'){
         var jsonData=responseJson.copyright.map(item => {
           return item;
         });
        }else{
          alert('Here is default Random Asteroid key');
        }
      });
    }
    GetDetails(item){
        this.setState({showdetails: true,showList:false});
        const response =  fetch("https://ssd.jpl.nasa.gov/sbdb.cgi?sstr="+item)
        .then((response) => response)
        .then((responseJson) => {
          this.setState({IdDetails:responseJson});
          this.setState({RanAstoidId:item})
          // if(responseJson.status=='200'){
          //   // var jsonData=responseJson.headers.map.map(item => {
          //   //   return item;
          //   // });
          //   this.setState({IdDetails:jsonData})
          //   alert(JSON.stringify(IdDetails));
          //  }
         });
    }

    render(){
        return(
           <View>
               <Card style={styles.card_style}>
                   <TextInput style={styles.textInput}
                      // underlineColorAndroid='rgba(0,0,0,0)' 
                      name="Input"
                      placeholder="Enter Asteroid Id"
                      placeholderTextColor = "#757575"
                      selectionColor="#000"
                      // keyboardType="email-address"
                      onChangeText={InputId => this.setState({InputId})}
                      value={this.state.InputId}
                      /> 
                      <View >
                      <TouchableOpacity onPress={() => this.SubmitId()} disabled={!this.state.InputId} style={[styles.button_1, { backgroundColor:!this.state.InputId ? '#999' : '#009688' }]} >
                  <Text  style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                      </View>
                     
                     <View>
                     <TouchableOpacity onPress={() => this.Call_Random_Ast()} style={styles.button_2}>
                  <Text style={styles.buttonText}>Random Asteroid</Text>
                  </TouchableOpacity>
                     </View>
                     
               </Card>
               {/* show Random List */}
               <View>
               {(this.state.showList) && <Card style={styles.card_style}>
               <FlatList
             data={this.RandomIds}
              renderItem={({item}) => 
              <TouchableOpacity style={styles.list} onPress={() => this.GetDetails(item)}><Text>{item}</Text>
              <View style={styles.hairline}></View>
              </TouchableOpacity>
            }
        />
               </Card>}
               </View>
               {/* Show No Data Found */}
               {(!this.state.matched_id) &&
               <View>
                 <Card style={styles.card_styl_ND}>
                   <Text style={{marginTop:10}}>NO DATA FOUND</Text>
                   <View style={styles.hairline}></View>
                 </Card>
               </View>
               }
               {/* Show Id Detailss */}
               {(this.state.showdetails) && <View>
                   <Card style={styles.card_style}>
                    <View style={{flex:0,flexDirection:'column'}}>
                        <View style={styles.name_f}>
                            <Text>Name:</Text>
               <Text style={styles.font}>{this.state.RanAstoidId}</Text>
                        </View>
                        <View style={styles.hairline}></View>
                        <View style={styles.url_ln}>
                            <Text>nasa_jpl_url:</Text>
               <Text style={styles.font}>{this.state.IdDetails.url}</Text>
                        </View>
                        <View style={styles.hairline}></View>
                        <View style={styles.name_f}>
                            <Text>is_potentially_hazardous_asteroid:</Text>
                            <Text style={styles.font}>False</Text>
                        </View>
                    </View>
                   </Card>
               </View>}
           </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#d4d4d4',
      marginLeft:5,
  
    },
    list:{
        padding:12,
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        marginTop:8,paddingBottom:10
    },
    hairline: {
        backgroundColor: '#f2f2f2',
        height: 1,
        width: 300,
        marginLeft:15,marginTop:0,flex:0
      },
    textInput: {
        alignSelf: 'stretch',
        padding:5,
        fontSize:17,
        // marginLeft: 50,
        borderBottomColor:'#999',
        margin:5,
        // marginRight:50,
    
        borderBottomColor: '#999', 
        borderBottomWidth:1 
    },
    card_style:{
        marginTop:20,
        marginLeft:10,
        width:'95%',alignContent:'center',alignItems:'center'
    },
    card_styl_ND:{
      marginTop:0,
      marginLeft:10,
      width:'95%',alignContent:'center',alignItems:'center',
      height:500
    },
    button_1: {
        width:310,
          marginVertical: 10,
          paddingVertical:10,
      },
      url_ln:{
        flex:0,flexDirection:'row',padding:10,width:250
      },
      name_f:{
        flex:0,flexDirection:'row',padding:10
      },
      font:{
        fontWeight:'bold'
      },
      button_2: {
        width:310,
        backgroundColor:'blue',
          marginVertical: 10,
          paddingVertical:10,
      },
    buttonText: {
        fontSize:15,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center',
        fontFamily:'serif'
      },
})