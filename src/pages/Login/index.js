import React, {useEffect, useState} from 'react';
import {Image, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import SocialButton from '../components/SocialButton';

import social from '../../services/social';
import {useDispatch} from 'react-redux';
import {updateUser, checkUser} from '../../store/modules/app/actions';

import logo from '../../assets/logo.png';
import bgBottom from '../../assets/bg-bottom-login.png';

import {Container, Button, ButtonText} from '../../styles';
import graph from '../../services/facebook';
import myApi from '../../services/session';
import FormInput from '../../components/FormInput'

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resulter, setResulter] = useState()
  const dispatch = useDispatch();

  // useEffect(() => {

  // }, [resulter])

  const fbLogin = async () => {

    console.log('AQUI');
    try {
      const auth = await myApi.post("/sessionDriver",  {
        email: email,
        password: password,
      })
      // setResulter(auth.data);
      
      // alert(JSON.stringify(resulter.data))
      // console.log('AOTTT', auth.data)
      
      // const user = await social.makeRequest(
      //   'facebook',
      //   '/me?fileds=id,name,email',
      // );

      // const user = await graph.get(
      //   `/me?fields=id,name,email&access_token=${auth.response.credentials.accessToken}`,
      // );

      dispatch(
        updateUser({
          fbId: auth.data.user.id,
          nome: auth.data.user.name,
          email: auth.data.user.email,
          accessToken: auth.data.token,
        }),
        console.log('user =>' + auth.data.token )
        );
      dispatch(checkUser());
      navigation.navigate('Home')
    } catch (err) {
      alert(err.message);
    }
  };

  const checkLogin = async () => {
    //AsyncStorage.clear();
    const user = await AsyncStorage.getItem('@user');
    if (user) {
      dispatch(updateUser(JSON.parse(user)));
      navigation.replace('Home');
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <Container color="info50" justify="flex-end">
      <Container
        justify="space-around"
        padding={30}
        position="absolute"
        height={270}
        top={0}
        zIndex={9}>
        <Image source={logo} />


        <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text>{email}</Text>

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />
        <Button
            // buttonTitle="Sign In with Facebook"
            // btnType="facebook"
            // color="#4867aa"
            // backgroundColor="#e6eaf4"
            onPress={() => fbLogin()}
          />
      </Container>
      <Image source={bgBottom} />
    </Container>
  );
};

export default Login;
