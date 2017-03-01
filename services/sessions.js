import React from 'react';

export default class Sessions {
  async getSessions() {
    try {
      let response = await fetch('http://shared.ws.mirego.com.s3.amazonaws.com/mgagnon/sessions.json');
      let responseJson = await response.json();
      return responseJson;
    } catch(error) {
      console.error(error);
    }
  } 
}

