import {GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import userMapper from './mappers/user';

const USER_FIELDS = 'fields=id,name,picture';

export const search = (query, callback) => {
  const infoRequest = new GraphRequest(
    `/search?q=${encodeURIComponent(query)}&type=user&${USER_FIELDS}&limit=50`,
    null,
    (error, result) => {
      if (!error) {
        callback(result.data.map((user) => userMapper(user)));
      }
    }
  );
  new GraphRequestManager().addRequest(infoRequest).start();
};

export const get = (usersIds, callback) => {
  const infoRequest = new GraphRequest(
    `?ids=${usersIds.join(',')}&${USER_FIELDS}`,
    null,
    (error, result) => {
      if (!error) {
        callback(Object.keys(result).map((key) => userMapper(result[key])));
      }
    }
  );
  new GraphRequestManager().addRequest(infoRequest).start();
}
