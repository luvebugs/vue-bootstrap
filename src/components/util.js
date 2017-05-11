const getParams = function (that, string) {
  let params = that.string.split('.');
  let value = that[params[0]];
  for (let i = 1; i < params.length; i++) {
    value = value[params[i]]
  }
  return value;
}

const getHnadler = function (that, string) {
  let actions = that.string.split('.');
  let action = that[actions[0]];
  for (let i = 1; i < actions.length; i++) {
    action = action[actions[i]]
  }
  return action;
}

export default {

}
